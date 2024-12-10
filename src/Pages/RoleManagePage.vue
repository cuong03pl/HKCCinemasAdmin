<template>
  <div
    class="p-4 md:p-6 2xl:p-10 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="w-full mb-1">
      <div class="mb-4">
        <Breadcrumb />
        <h1
          class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
        >
          All roles
        </h1>
      </div>
      <div
        class="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700"
      >
        <!-- Start search -->
        <Search @handleSubmit="search" placeholder="Search for roles" />
        <ButtonHandleCreate
          @handleCreate="createNewRole"
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
                  Tên role
                </th>
                <th
                  scope="col"
                  class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                >
                  NormalizedName
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
                v-for="(item, index) in roleList"
                :key="index"
                class="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td
                  class="max-w-sm p-4 overflow-hidden text-base font-normal text-white truncate xl:max-w-xs"
                >
                  {{ item?.name }}
                </td>

                <td
                  class="max-w-sm p-4 overflow-hidden text-base font-normal text-white truncate xl:max-w-xs"
                >
                  {{ item?.normalizedName }}
                </td>

                <td class="p-4 space-x-2 whitespace-nowrap flex">
                  <ButtonHandleModal
                    @handleDelete="deleteRole"
                    @handleUpdate="updateRole"
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
  GetAllFilmByActorId,
  GetAllRoles,
  createNewActor,
  deleteActor,
  getAllActors,
  getFilmList,
  updateActor,
  createNewRole,
  updateRole,
  deleteRole,
  GetCountRole,
} from "@/Services/FetchAPI";
import store from "@/store/store";
import { paginationConfig } from "../../config/paginationConfig";
import Pagination from "@/components/Pagination/Pagination.vue";
export default {
  data() {
    return {
      roleList: [],
      toggleModal: false,
      toggleModalDelete: false,
      count: 0,

      selectListData: [],
      formFields: formFields.role,
      keyword: "",
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
        const res = await GetAllRoles();
        this.count = res.data[0].count;
        this.roleList = res.data.slice(0, 5);
      } catch (error) {}
    },
    async createNewRole(form_data) {
      var formData = new FormData();
      formData.append("rolename", form_data.name);
      await createNewRole(formData)
        .then((res) => {
          store.commit("setNotifyModal", {
            isOpen: true,
            message: res.data,
          });
          this.loadData();
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
    async updateRole(id, form_data) {
      var formData = new FormData();
      formData.append("rolename", form_data.name);

      await updateRole(id, formData)
        .then((res) => {
          store.commit("setNotifyModal", {
            isOpen: true,
            message: res.data,
          });
          this.loadData();
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
    async deleteRole(id) {
      await deleteRole(id)
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
    async getCount() {
      const res = await GetCountRole();
      this.count = res.data;
    },
    async handlePagination(page) {
      try {
        const res = await GetAllRoles({
          params: {
            PageNumber: page || this.$route?.query?.PageNumber,
            PageSize: 5,
            Keyword: this.keyword,
          },
        });
        this.roles = res.data;
      } catch (error) {}
    },

    convertTime,
  },
  components: {
    ButtonHandleModal,
    ButtonHandleCreate,
    ModelMessage,
    Pagination,
  },
};
</script>

<style></style>
