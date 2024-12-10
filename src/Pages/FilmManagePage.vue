<template>
  <div
    class="p-4 md:p-6 2xl:p-10 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="w-full mb-1">
      <div class="mb-4">
        <Breadcrumb name="Film" />
        <h1
          class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
        >
          All films
        </h1>
      </div>
      <div
        class="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700"
      >
        <!-- Start search -->
        <Search @handleSubmit="search" placeholder="Search for films" />
        <!-- End search -->
        <ButtonHandleCreate
          @handleCreate="createNewFilm"
          :selectListData="selectListData"
          :class="'mt-4 mb-4'"
          :formFields="formFields"
        />
      </div>
    </div>
  </div>
  <div class="flex flex-col">
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
                  Ảnh phim
                </th>
                <th
                  scope="col"
                  class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                >
                  Tên phim
                </th>
                <th
                  scope="col"
                  class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                >
                  Thời lượng
                </th>
                <th
                  scope="col"
                  class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                >
                  Đánh giá
                </th>
                <th
                  scope="col"
                  class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                >
                  Thời gian phát hành
                </th>
                <th
                  scope="col"
                  class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                >
                  Thời gian kết thúc
                </th>
                <th
                  scope="col"
                  class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                >
                  Đạo diễn
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
                v-for="(item, index) in filmList"
                :key="index"
                class="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td
                  class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400"
                >
                  <div
                    class="max-w-[200px] text-base font-semibold text-gray-900 dark:text-white"
                  >
                    <img
                      class="w-full h-full"
                      :src="`https://hkccinemas.azurewebsites.net/${item.image}`"
                      alt=""
                    />
                  </div>
                </td>

                <td
                  class="max-w-sm p-4 overflow-hidden text-base font-normal text-white truncate xl:max-w-xs"
                >
                  {{ item?.title }}
                </td>
                <td
                  class="max-w-sm p-4 overflow-hidden text-base font-normal text-white truncate xl:max-w-xs"
                >
                  {{ item?.duration }}
                </td>

                <td
                  class="max-w-sm p-4 overflow-hidden text-base font-normal text-white truncate xl:max-w-xs"
                >
                  {{ item?.rating }}
                </td>
                <td
                  class="max-w-sm p-4 overflow-hidden text-base font-normal text-white truncate xl:max-w-xs"
                >
                  {{ convertTime(item.releaseDate) }}
                </td>
                <td
                  class="max-w-sm p-4 overflow-hidden text-base font-normal text-white truncate xl:max-w-xs"
                >
                  {{ item.endDate && convertTime(item.endDate) }}
                </td>
                <td
                  class="max-w-sm p-4 overflow-hidden text-base font-normal text-white truncate xl:max-w-xs"
                >
                  {{ item.director }}
                </td>

                <td class="p-4 space-x-2 whitespace-nowrap">
                  <ButtonHandleModal
                    @handleDelete="deleteFilm"
                    @handleUpdate="updateFilm"
                    :data="item"
                    :formFields="formFields"
                    :selectListData="selectListData"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <Pagination
              :pageCount="countPage"
              @handlePagination="handlePagination"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ButtonHandleModal from "@/components/Modal/ButtonHandleModal.vue";
import axios from "axios";
import ButtonHandleCreate from "@/components/Modal/ButtonHandleCreate.vue";
import ModelMessage from "@/components/Modal/ModelMessage.vue";
import { convertTime } from "../../config/functions";
import { formFields } from "../../config/formFields";
import {
  createNewFilm,
  deleteFilm,
  getAllCategories,
  getFilmList,
  updateFilm,
  GetAllCategoryIdByFilmId,
  SearchFilm,
  GetCountFilm,
} from "@/Services/FetchAPI";
import store from "@/store/store";
import Search from "@/components/Search/Search.vue";
import Pagination from "@/components/Pagination/Pagination.vue";
import { paginationConfig } from "../../config/paginationConfig";
import router from "@/router";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue";
export default {
  data() {
    return {
      filmList: [],
      toggleModal: false,
      toggleModalDelete: false,
      selectListData: [],
      formFields: formFields.film,
      count: 0,
      keyword: "",
    };
  },
  created() {
    this.getAllCategories();
    this.loadData();
    this.getCountFilm();
  },
  computed: {
    countPage() {
      return this.count / paginationConfig.perPage;
    },
  },
  methods: {
    async loadData() {
      try {
        const res = await getFilmList();
        const films = await Promise.all(
          res.data.map(async (item) => {
            const categories = await GetAllCategoryIdByFilmId(item.id);
            return { ...item, categoryIds: categories.data };
          })
        );

        this.filmList = films.slice(0, 5);
        this.count = films[0].count;
      } catch (error) {}
    },
    async getAllCategories() {
      try {
        await getAllCategories().then(
          (res) => (this.selectListData = JSON.parse(JSON.stringify(res.data)))
        );
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    },
    async createNewFilm(form_data) {
      var formData = new FormData();
      formData.append("title", form_data.title);
      formData.append("detail", form_data.detail);
      formData.append("synopsis", form_data.synopsis);
      formData.append("ageLimit", form_data.ageLimit);
      formData.append("duration", form_data.duration);
      formData.append("country", form_data.country);
      formData.append("rating", form_data.rating);
      formData.append("formFile", form_data.image);
      formData.append("formFileBackground", form_data.background);
      formData.append("releaseDate", form_data.releaseDate);
      formData.append("endDate", form_data.endDate);
      if (form_data.categoryIds) {
        form_data.categoryIds?.forEach((item) => {
          formData.append("categoryIds[]", item);
        });
      }
      formData.append("director", form_data.director);
      await createNewFilm(formData)
        .then((res) => {
          store.commit("setNotifyModal", {
            isOpen: true,
            message: res.data,
          });
          this.loadFilm();
        })
        .catch((err) => {
          if (err.response.status == 400) {
            store.commit("setNotifyModal", {
              isOpen: true,
              message: "Vui lòng nhập đầy đủ thông tin",
            });
          }
        });
    },
    async updateFilm(id, form_data) {
      var formData = new FormData();
      formData.append("id", id);
      formData.append("title", form_data.title);
      formData.append("detail", form_data.detail);
      formData.append("synopsis", form_data.synopsis);
      formData.append("ageLimit", form_data.ageLimit);
      formData.append("duration", form_data.duration);
      formData.append("country", form_data.country);
      formData.append("rating", form_data.rating);
      formData.append("formFile", form_data.image);
      formData.append("formFileBackground", form_data.background);
      formData.append("releaseDate", form_data.releaseDate);
      formData.append("endDate", form_data.endDate);
      form_data.categoryIds?.forEach((item) => {
        formData.append("categoryIds[]", item);
      });
      formData.append("director", form_data.director);

      await updateFilm(id, formData)
        .then((res) => {
          store.commit("setNotifyModal", {
            isOpen: true,
            message: res.data,
          });
          this.loadFilm();
        })
        .catch((err) => {
          if (err.response.status == 400) {
            store.commit("setNotifyModal", {
              isOpen: true,
              message: "Vui lòng nhập đầy đủ thông tin",
            });
          }
        });
    },
    async deleteFilm(id) {
      await deleteFilm(id)
        .then((res) => {
          store.commit("setNotifyModal", {
            isOpen: true,
            message: res.data,
          });
          this.loadFilm();
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
    async getCountFilm() {
      const res = await GetCountFilm();
      this.count = res.data;
    },

    async handlePagination(page) {
      try {
        const res = await SearchFilm({
          params: {
            PageNumber: page || this.$route?.query?.PageNumber,
            PageSize: 5,
            Keyword: this.keyword,
          },
        });
        const films = await Promise.all(
          res.data.map(async (item) => {
            const categories = await GetAllCategoryIdByFilmId(item.id);
            return { ...item, categoryIds: categories.data };
          })
        );
        this.filmList = films;
        this.count = films[0].count;
      } catch (error) {}
    },
    convertTime,
  },
  components: {
    ButtonHandleModal,
    ButtonHandleCreate,
    ModelMessage,
    Search,
    Pagination,
    Breadcrumb,
  },
};
</script>

<style></style>
