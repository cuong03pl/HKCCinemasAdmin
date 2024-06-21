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
          <span v-for="(role, index) in item.roles.data" :key="index">{{
            role
          }}</span>
        </span>
        <span class="w-[20%]">
          <ButtonHandleModal
            @handleDelete="deleteUser"
            :data="item"
            :formFields="formFields"
          />
        </span>
      </div>
    </div>
    <ModelMessage
      :isOpen="toggleModalMessage"
      @handleClose="handleClose"
      :message="this.message"
    />
  </div>
</template>
<script>
import ButtonHandleModal from "@/components/Modal/ButtonHandleModal.vue";
import axios from "axios";
import ButtonHandleCreate from "@/components/Modal/ButtonHandleCreate.vue";
import ModelMessage from "@/components/Modal/ModelMessage.vue";
import { formFields } from "../../config/formFields";
import {
  deleteUser,
  GetAllRolesByUser,
  getAllUsers,
} from "@/Services/FetchAPI";
export default {
  data() {
    return {
      userList: [],
      toggleModal: false,
      toggleModalDelete: false,
      toggleModalMessage: false,
      message: Object,
      formFields: formFields.user,
    };
  },
  mounted() {
    this.loadUser();
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
              roles: roles,
            };
          })
        );
        this.userList = users;
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu lịch chiếu:", error);
      }
    },
    // createNewUser(form_data) {
    //   console.log(form_data);
    //   var formData = new FormData();
    //   formData.append("userName", form_data.userName);
    //   formData.append("email", form_data.email);
    //   createNewUser(formData).then((res) => {
    //     console.log(res);
    //     this.toggleModalMessage = true;
    //     this.message = res;
    //     this.userList.push(JSON.parse(res.config.data));
    //     console.log(this.userList);
    //   });
    // },
    async deleteUser(id) {
      await deleteUser(id).then((res) => {
        this.toggleModalMessage = true;
        this.message = res;
        this.loadUser();
      });
    },
    //  updateUser (id, form_data) {
    //     var formData = new FormData();
    //     formData.append("id", id);
    //     formData.append("username", form_data.userName);
    //     formData.append("email", form_data.email);
    //     console.log(formData);
    //     updateUser(id, formData).then((res) => {
    //       this.toggleModalMessage = true;
    //       this.message = res;
    //       this.loadUser();
    //     });
    //   },
    handleClose(n) {
      this.toggleModalMessage = n;
    },
  },
  components: { ButtonHandleModal, ButtonHandleCreate, ModelMessage },
};
</script>

<style></style>
