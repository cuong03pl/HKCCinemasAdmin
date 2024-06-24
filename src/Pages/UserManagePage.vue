<template>
  <div>
    <div>
      <span class="text-[30px] font-bold"> Quản lý người dùng </span>
    </div>
    <div>
      <div class="flex justify-between font-medium py-[16px] px-3 bg-white">
        <!-- <span class="w-[25%]">ID</span> -->
        <span class="w-[30%]">UserName</span>
        <span class="w-[20%]">Email</span>
        <span class="w-[30%]">Roles</span>
        <span class="w-[20%]">Chức năng </span>
      </div>
      <div
        v-for="(item, index) in userList"
        :key="index"
        class="flex justify-around items-center border-t border-t-[#0000002f] h-[48px] px-[16px] hover:bg-[#e5e5e5]"
      >
        <!-- <span class="w-[25%]">{{ item.id }}</span> -->
        <span class="w-[30%]">{{ item.userName }}</span>
        <span class="w-[20%]">{{ item.email }}</span>
        <span class="w-[30%]">
          <span v-for="(role, index) in item.roles" :key="index"
            >{{ role.name }}
            <span v-if="item.roles.length > 1 && index < item.roles.length - 1"
              >,
            </span>
          </span>
        </span>
        <span class="w-[20%] flex gap-2">
          <ButtonHandleModal
            @handleDelete="deleteUser"
            :data="item"
            :formFields="formFields"
          />
          <ButtonHandleSetRole
            @handleUpdate="changeRole"
            :data="item"
            :selectListData="rolesList"
            :formFields="formFields2"
          />
        </span>
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
  setRole,
} from "@/Services/FetchAPI";
import store from "@/store/store";
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
      selectedUserRoles: [],
    };
  },

  mounted() {
    this.loadUser();
    this.getAllRoles();
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
        this.userList = users;
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
      console.log(roles);
      console.log(id);
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
  },
  components: {
    ButtonHandleModal,
    ButtonHandleCreate,
    ModelMessage,

    ButtonHandleSetRole,
  },
};
</script>

<style></style>
