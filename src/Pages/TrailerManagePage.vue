<template>
  <div
    class="p-4 md:p-6 2xl:p-10 bg-white block sm:flex items-center justify-between border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="w-full mb-1">
      <div class="mb-4">
        <Breadcrumb name="Quản lý trailer" />
        <h1
          class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
        >
          Quản lý trailer
        </h1>
      </div>
      <div
        class="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700"
      >
        <!-- Start search -->
        <Search @handleSubmit="search" placeholder="Nhập tên phim" />
        <!-- End search -->
        <ButtonHandleCreate
          @handleCreate="createNewTrailer"
          :selectListData="selectListData"
          :class="'mt-4 mb-4'"
          :formFields="formFields"
          title="New Trailer"
        />
      </div>
    </div>
  </div>
  <div v-if="trailerList.length > 0" class="flex flex-col">
    <div class="overflow-x-auto">
      <div class="inline-block min-w-full align-middle">
        <div class="overflow-hidden shadow">
          <table
            class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600"
          >
            <thead class="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th
                  scope="col"
                  class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                >
                  Demo
                </th>
                <th
                  scope="col"
                  class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                >
                  Phim
                </th>
                <th
                  scope="col"
                  class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                >
                  Link
                </th>

                <th
                  scope="col"
                  class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                >
                  Chức năng
                </th>
              </tr>
            </thead>
            <tbody
              class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700"
            >
              <tr
                v-for="(item, index) in trailerList"
                :key="index"
                class="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td
                  class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400"
                >
                  <span class="max-w-[50%] block">
                    <iframe
                      :key="index"
                      :src="item.link"
                      width="100%"
                      height="100%"
                      frameborder="0"
                      allow="autoplay; encrypted-media"
                      allowfullscreen
                    ></iframe>
                  </span>
                </td>

                <td
                  class="max-w-sm p-4 overflow-hidden text-base font-normal text-white truncate xl:max-w-xs"
                >
                  {{ item?.filmTitle }}
                </td>
                <td
                  class="max-w-sm p-4 overflow-hidden text-base font-normal text-white truncate xl:max-w-xs"
                >
                  {{ item?.link }}
                </td>

                <td class="p-4 space-x-2 whitespace-nowrap">
                  <ButtonHandleModal
                    @handleDelete="deleteTrailer"
                    @handleUpdate="updateActor"
                    :data="item"
                    :formFields="formFields"
                    :selectListData="selectListData"
                    title="Update Trailer"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <Pagination
              :pageCount="countPage"
              @handlePagination="handlePagination"
              :pageSize="pageSize"
              :currentPage="currentPage"
              :count="count"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <EmptyList v-if="trailerList.length <= 0" />
</template>
<script>
import ButtonHandleModal from "@/components/Modal/ButtonHandleModal.vue";
import axios from "axios";
import ButtonHandleCreate from "@/components/Modal/ButtonHandleCreate.vue";
import ModelMessage from "@/components/Modal/ModelMessage.vue";
import { formFields } from "../../config/formFields";
import {
  createNewTrailer,
  deleteTrailer,
  GetAllTrailers,
  GetCountTrailer,
  getFilmById,
  getFilmList,
  SearchTrailer,
} from "@/Services/FetchAPI";
import store from "@/store/store";
import Search from "@/components/Search/Search.vue";
import { paginationConfig } from "../../config/paginationConfig";
import Pagination from "@/components/Pagination/Pagination.vue";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue";
import EmptyList from "@/components/EmptyList/EmptyList.vue";
export default {
  data() {
    return {
      trailerList: [],
      toggleModal: false,
      toggleModalDelete: false,
      selectListData: [],
      count: 0,
      pageSize: 5,
      currentPage: 1,
      formFields: formFields.trailer,
      keyword: "",
    };
  },
  mounted() {
    this.fetchApi();
    this.loadData();
    this.getCount();
    this.currentPage = Number(this.$route.query.PageNumber) || 1;
  },
  computed: {
    countPage() {
      return Math.ceil(this.count / paginationConfig.perPage);
    },
  },
  methods: {
    async loadData() {
      try {
        const res = await GetAllTrailers();
        const trailers = await Promise.all(
          res.data.map(async (item) => {
            const title = await this.getFilmName(item.filmId);
            return { ...item, filmTitle: title };
          })
        );
        if (this.currentPage > this.countPage) {
          await this.handlePagination(this.countPage);
        }
        if (this.currentPage <= 0) {
          await this.handlePagination(1);
        }
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.trailerList = trailers.slice(start, end);
        this.count = res.data[0].count;
      } catch (error) {}
    },
    async fetchApi() {
      try {
        await getFilmList().then((res) => (this.selectListData = res.data));
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    },
    async getFilmName(id) {
      return await getFilmById(id).then((res) => res.data.title);
    },
    async createNewTrailer(form_data) {
      var formData = new FormData();
      formData.append("link", form_data.link);
      formData.append("filmId", form_data.filmId);
      await createNewTrailer(formData)
        .then((res) => {
          store.commit("setNotifyModal", {
            isOpen: true,
            message: res.data,
          });
          this.trailerList.push(JSON.parse(res.config.data));
        })
        .catch((error) => {
          console.error("Error:", error); // Log lỗi nếu có
        });
    },
    async deleteTrailer(id) {
      await deleteTrailer(id)
        .then(async (res) => {
          store.commit("setNotifyModal", {
            isOpen: true,
            message: res.data,
          });
          await this.loadData();
          if (this.showdateList.length === 0 && this.currentPage > 1) {
            await this.handlePagination(this.currentPage - 1);
          }
        })
        .catch((err) => {
          store.commit("setNotifyModal", {
            isOpen: true,
            message: "Xóa không thành công",
          });
        });
    },
    async search(keyword) {
      this.keyword = keyword;
      this.handlePagination(1);
      this.$router.push({
        query: {
          ...this.$route.query,
          q: keyword,
        },
      });
    },
    async getCount() {
      const res = await GetCountTrailer();
      this.count = res.data;
    },
    async handlePagination(page) {
      this.currentPage = page;
      try {
        this.$router.push({
          query: {
            ...this.$route.query,
            PageNumber: page,
          },
        });
        const res = await SearchTrailer({
          params: {
            PageNumber: page || this.$route?.query?.PageNumber,
            PageSize: this.pageSize,
            Keyword: this.keyword,
          },
        });
        const trailers = await Promise.all(
          res.data.map(async (item) => {
            const title = await this.getFilmName(item.filmId);
            return { ...item, filmTitle: title };
          })
        );
        this.trailerList = trailers;
        this.count = trailers[0].count;
      } catch (error) {}
    },
  },
  components: {
    ButtonHandleModal,
    ButtonHandleCreate,
    ModelMessage,
    Search,
    Pagination,
    Breadcrumb,
    EmptyList,
  },
};
</script>

<style></style>
