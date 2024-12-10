<template>
  <div
    class="p-4 md:p-6 2xl:p-10 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="w-full mb-1">
      <div class="mb-4">
        <Breadcrumb name="User" />
        <h1
          class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
        >
          All users
        </h1>
      </div>
      <div
        class="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700"
      >
        <!-- Start search -->
        <Search @handleSubmit="search" placeholder="Search for users" />
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
                  Username
                </th>
                <th
                  scope="col"
                  class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                >
                  Email
                </th>
                <th
                  scope="col"
                  class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                >
                  Chức vụ
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
                v-for="(item, index) in userList"
                :key="index"
                class="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td
                  class="max-w-sm p-4 overflow-hidden text-base font-normal text-white truncate xl:max-w-xs"
                >
                  {{ item?.userName }}
                </td>

                <td
                  class="max-w-sm p-4 overflow-hidden text-base font-normal text-white truncate xl:max-w-xs"
                >
                  {{ item?.email }}
                </td>

                <td
                  class="max-w-sm p-4 overflow-hidden text-base font-normal text-white truncate xl:max-w-xs"
                >
                  <span v-for="(role, index) in item.roles" :key="index"
                    >{{ role.name }}
                    <span
                      v-if="
                        item.roles.length > 1 && index < item.roles.length - 1
                      "
                      >,
                    </span>
                  </span>
                </td>
                <td class="p-4 space-x-2 whitespace-nowrap flex">
                  <ButtonHandleModal
                    @handleDelete="deleteUser"
                    :data="item"
                    :formFields="formFields"
                    title="Update User"
                  />
                  <ButtonHandleSetRole
                    @handleUpdate="changeRole"
                    :data="item"
                    :selectListData="rolesList"
                    :formFields="formFields2"
                    title="Update Role"
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
import ButtonHandleCreate from "@/components/Modal/ButtonHandleCreate.vue";
import ButtonHandleSetRole from "@/components/Modal/ButtonHandleSetRole.vue";
import ModelMessage from "@/components/Modal/ModelMessage.vue";
import { formFields } from "../../config/formFields";
import {
  deleteUser,
  GetAllRoles,
  GetAllRolesByUser,
  getAllUsers,
  GetCountUser,
  SearchUser,
  setRole,
} from "@/Services/FetchAPI";
import store from "@/store/store";
import Search from "@/components/Search/Search.vue";
import { paginationConfig } from "../../config/paginationConfig";
import Pagination from "@/components/Pagination/Pagination.vue";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue";
export default {
  data() {
    return {
      userList: [],
      rolesList: [],
      toggleModal: false,
      toggleModalDelete: false,
      toggleModalSetRole: false,
      formFields: formFields.user,
      formFields2: formFields.userRoles,
      userId: "",
      count: 0,
      selectedUserRoles: [],
      keyword: "",
    };
  },
  computed: {
    countPage() {
      return this.count / paginationConfig.perPage;
    },
  },
  mounted() {
    this.loadUser();
    this.getAllRoles();
    this.getCount();
  },
  methods: {
    async loadUser() {
      try {
        const res = await getAllUsers();
        const users = await Promise.all(
          res.data.map(async (item) => {
            var roles = await GetAllRolesByUser(item.id);
            return {
              ...item,
              roles: roles.data,
              selectedUserRoles: roles.data.map((res) => res.id),
            };
          })
        );
        this.userList = users.slice(0, 5);
        this.count = res.data[0].count;
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu lịch chiếu:", error);
      }
    },
    async getAllRoles() {
      try {
        const res = await GetAllRoles();
        this.rolesList = res.data;
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu lịch chiếu:", error);
      }
    },
    async deleteUser(id) {
      await deleteUser(id).then((res) => {
        this.toggleModalMessage = true;
        this.message = res;
        this.loadUser();
      });
    },

    handleCloseModalSetRole() {
      this.toggleModalSetRole = false;
    },
    handleOpenModalSetRole(id) {
      this.toggleModalSetRole = true;
      this.userId = id;
    },

    async changeRole(id, roles) {
      var formData = new FormData();
      if (roles) {
        roles?.selectedUserRoles.forEach((item) => {
          formData.append("roles[]", item);
        });
      }
      await setRole(id, formData)
        .then((res) => {
          store.commit("setNotifyModal", {
            isOpen: true,
            message: res.data,
          });
          this.loadUser();
        })
        .catch((err) => {
          if (err.response.status == 400) {
          }
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
      const res = await GetCountUser();
      this.count = res.data;
    },
    async handlePagination(page) {
      try {
        const res = await SearchUser({
          params: {
            PageNumber: page || this.$route?.query?.PageNumber,
            PageSize: 5,
            Keyword: this.keyword,
          },
        });
        const users = await Promise.all(
          res.data.map(async (item) => {
            var roles = await GetAllRolesByUser(item.id);
            return {
              ...item,
              roles: roles.data,
              selectedUserRoles: roles.data.map((res) => res.id),
            };
          })
        );
        this.userList = users;
        this.count = users[0].count;
      } catch (error) {}
    },
  },
  components: {
    ButtonHandleModal,
    ButtonHandleCreate,
    ModelMessage,

    ButtonHandleSetRole,
    Search,
    Pagination,
    Breadcrumb,
  },
};
</script>

<style></style>
