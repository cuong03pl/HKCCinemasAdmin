<template>
  <div
    class="p-4 md:p-6 2xl:p-10 bg-white block sm:flex items-center justify-between border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="w-full mb-1">
      <div class="mb-4">
        <Breadcrumb name="Quản lý công ty chiếu phim" />
        <h1
          class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
        >
          Quản lý công ty chiếu phim
        </h1>
      </div>
      <div
        class="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700"
      >
        <!-- Start search -->
        <Search
          @handleSubmit="search"
          placeholder="Nhập tên công ty chiếu phim"
        />
        <!-- End search -->
        <ButtonHandleCreate
          @handleCreate="createNewCinemasCategory"
          :selectListData="selectListData"
          :class="'mt-4 mb-4'"
          :formFields="formFields"
          title="New Cinemas Category"
        />
      </div>
    </div>
  </div>
  <div v-if="cinemasCategoryList.length > 0" class="flex flex-col">
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
                  Ảnh rạp chiếu
                </th>
                <th
                  scope="col"
                  class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                >
                  Tên rạp chiếu
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
                v-for="(item, index) in cinemasCategoryList"
                :key="index"
                class="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td
                  class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400"
                >
                  <div
                    class="max-w-[30%] xl:max-w-[15%] flex items-center justify-center"
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
                  {{ item?.name }}
                </td>

                <td class="p-4 space-x-2 whitespace-nowrap">
                  <ButtonHandleModal
                    @handleDelete="deleteCinemasCategory"
                    @handleUpdate="updateCinemasCategory"
                    :data="item"
                    :formFields="formFields"
                    :selectListData="selectListData"
                    title="Update Cinemas Category"
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
  <EmptyList v-if="cinemasCategoryList.length <= 0" />
</template>
<script>
import ButtonHandleModal from "@/components/Modal/ButtonHandleModal.vue";
import axios from "axios";
import ButtonHandleCreate from "@/components/Modal/ButtonHandleCreate.vue";
import ModelMessage from "@/components/Modal/ModelMessage.vue";
import { formFields } from "../../config/formFields";
import {
  createNewCinemasCategories,
  deleteCinemasCategory,
  getAllCinemasCategories,
  GetCountCinemasCategory,
  SearchCinemasCategory,
  updateCinemasCategory,
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
      cinemasCategoryList: [],
      toggleModal: false,
      toggleModalDelete: false,
      count: 0,
      keyword: "",
      selectListData: [],
      formFields: formFields.cinemas_category,
      pageSize: 3,
      currentPage: 1,
    };
  },
  created() {
    this.loadData();
    this.getCount();
    this.currentPage = Number(this.$route.query.PageNumber) || 1;
  },
  computed: {
    countPage() {
      //
      return Math.ceil(this.count / this.pageSize);
    },
  },
  methods: {
    async loadData() {
      await getAllCinemasCategories().then(async (res) => {
        ///
        if (this.currentPage > this.countPage) {
          await this.handlePagination(this.countPage);
        }
        if (this.currentPage <= 0) {
          await this.handlePagination(1);
        }
        ////
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.cinemasCategoryList = res.data.slice(start, end);
        this.count = res.data[0].count;
      });
    },

    async createNewCinemasCategory(form_data) {
      var formData = new FormData();
      formData.append("name", form_data.name);
      formData.append("formFile", form_data.image);

      await createNewCinemasCategories(formData)
        .then(async (res) => {
          store.commit("setNotifyModal", {
            isOpen: true,
            message: res.data,
          });
          await this.loadData();
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status == 400) {
            store.commit("setNotifyModal", {
              isOpen: true,
              message: "Vui lòng nhập đầy đủ thông tin",
            });
          }
        });
    },
    async updateCinemasCategory(id, form_data) {
      var formData = new FormData();
      formData.append("name", form_data.name);
      formData.append("formFile", form_data.image);

      await updateCinemasCategory(id, formData)
        .then(async (res) => {
          store.commit("setNotifyModal", {
            isOpen: true,
            message: res.data,
          });
          await this.loadData();
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
    async deleteCinemasCategory(id) {
      await deleteCinemasCategory(id)
        .then(async (res) => {
          store.commit("setNotifyModal", {
            isOpen: true,
            message: res.data,
          });

          await this.loadData();
          if (this.cinemasCategoryList.length === 0 && this.currentPage > 1) {
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
      const res = await GetCountCinemasCategory();
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
        const res = await SearchCinemasCategory({
          params: {
            PageNumber: page || this.$route?.query?.PageNumber,
            PageSize: this.pageSize,
            Keyword: this.keyword,
          },
        });
        this.cinemasCategoryList = res.data;
        this.count = res.data[0].count;
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
