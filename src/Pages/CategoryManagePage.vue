<template>
  <div
    class="p-4 md:p-6 2xl:p-10 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="w-full mb-1">
      <div class="mb-4">
        <Breadcrumb name="Category" />
        <h1
          class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
        >
          All categories
        </h1>
      </div>
      <div
        class="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700"
      >
        <!-- Start search -->
        <Search @handleSubmit="search" placeholder="Search for categories" />
        <!-- End search -->
        <ButtonHandleCreate
          @handleCreate="createNewCategory"
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
                  Tên thể loại
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
                v-for="(item, index) in categoryList"
                :key="index"
                class="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td
                  class="max-w-sm p-4 overflow-hidden text-base font-normal text-white truncate xl:max-w-xs"
                >
                  {{ item?.name }}
                </td>

                <td class="p-4 space-x-2 whitespace-nowrap">
                  <ButtonHandleModal
                    @handleDelete="deleteActor"
                    @handleUpdate="updateActor"
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
  createNewCategory,
  deleteCategory,
  getAllCategories,
  GetCountCategory,
  SearchCategory,
  updateCategory,
} from "@/Services/FetchAPI";
import store from "@/store/store";
import Search from "@/components/Search/Search.vue";
import { paginationConfig } from "../../config/paginationConfig";
import Pagination from "@/components/Pagination/Pagination.vue";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue";
export default {
  data() {
    return {
      categoryList: [],
      toggleModal: false,
      toggleModalDelete: false,
      count: 0,
      keyword: "",
      formFields: formFields.category,
    };
  },
  created() {
    this.loadData();
    this.getCount();
  },
  computed: {
    countPage() {
      return this.count / paginationConfig.perPage;
    },
  },
  methods: {
    async loadData() {
      try {
        const res = await getAllCategories();
        this.categoryList = res.data.slice(0, 5);
        this.count = res.data[0].count;
      } catch (error) {}
    },

    async createNewCategory(form_data) {
      var formData = new FormData();
      formData.append("name", form_data.name);
      await createNewCategory(formData)
        .then((res) => {
          store.commit("setNotifyModal", {
            isOpen: true,
            message: res.data,
          });
          this.loadData();
          this.toggleModal = false;
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
    async updateCategory(id, form_data) {
      var formData = new FormData();
      formData.append("name", form_data.name);
      await updateCategory(id, formData)
        .then((res) => {
          store.commit("setNotifyModal", {
            isOpen: true,
            message: res.data,
          });
          this.loadData();
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
    async deleteCategory(id) {
      await deleteCategory(id)
        .then((res) => {
          store.commit("setNotifyModal", {
            isOpen: true,
            message: res.data,
          });
          this.loadData();
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
      const res = await GetCountCategory();
      this.count = res.data;
    },
    async handlePagination(page) {
      try {
        const res = await SearchCategory({
          params: {
            PageNumber: page || this.$route?.query?.PageNumber,
            PageSize: 5,
            Keyword: this.keyword,
          },
        });
        this.categoryList = res.data;
        this.count = res.data[0].count;
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
