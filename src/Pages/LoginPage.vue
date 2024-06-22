<template>
  <div class="bg-[#009578] flex items-center justify-center h-[100vh]">
    <div class="bg-white px-[24px] py-[32px] w-[500px] rounded-lg">
      <h2 class="text-center text-[24px] font-bold">Đăng nhập</h2>
      <div class="mt-[20px]">
        <div class="px-[10px] py-[8px] border border-[#ccc] rounded-lg">
          <input
            class="w-full outline-none text-[16px] font-medium"
            type="text"
            v-model="username"
            placeholder="Nhập username của bạn"
          />
        </div>
        <!-- <div class="">
            <span class="text-[#ee2929] font-normal text-[14px]"
              >Tài khoản sai</span
            >
          </div> -->
      </div>

      <div class="mt-[20px]">
        <div
          class="px-[10px] py-[8px] border border-[#ccc] rounded-lg flex items-center"
        >
          <input
            class="w-full outline-none text-[16px] font-medium"
            type="password"
            v-model="password"
            placeholder="Nhập mật khẩu của bạn"
            ref="password"
          />
          <div class="cursor-pointer">
            <HidePasswordIcon
              v-if="!this.isShowPassword"
              class="w-[20px] h-[20px]"
              @click="handleShowPassword"
            />
            <ShowPasswordIcon
              v-if="this.isShowPassword"
              class="w-[20px] h-[20px]"
              @click="handleHidePassword"
            />
          </div>
        </div>
      </div>
      <ModelMessage
        :isOpen="toggleModalMessage"
        @handleClose="handleClose"
        :message="message"
      />
      <div class="mt-[20px]">
        <div class="">
          <RouterLink class="text-[#009578] font-medium" to="/">
            Quên mật khẩu
          </RouterLink>
        </div>
        <div class="flex justify-center">
          <Button @click="handleLogin" loginBtn title="Đăng nhập" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button/Button.vue";
import { RouterLink } from "vue-router";
import HidePasswordIcon from "@/components/Icon/HidePasswordIcon.vue";
import ShowPasswordIcon from "@/components/Icon/ShowPasswordIcon.vue";
import Modal from "@/components/Modal/Modal.vue";
import NotifyModal from "@/components/Modal/NotifyModal.vue";
import axios from "axios";
import ModelMessage from "@/components/Modal/ModelMessage.vue";
export default {
  components: {
    Button,
    RouterLink,
    HidePasswordIcon,
    ShowPasswordIcon,
    Modal,
    NotifyModal,
    ModelMessage,
  },
  data() {
    return {
      isShowPassword: false,
      username: "",
      password: "",
      message: "",
    };
  },
  methods: {
    handleLogin() {
      const formData = new FormData();
      formData.append("username", this.username);
      formData.append("password", this.password);
      axios
        .post("https://localhost:7253/api/Account/login", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            this.toggleModalMessage = true;
            localStorage.setItem("token", res.data);
            this.message = "Đăng nhập thành công";
            this.$router.go(-1);
          }
        })
        .catch((err) => {
          if (err.response.status == 401) {
            this.toggleModalMessage = true;
            this.message = "Username hoặc mật khẩu không chính xác";
          }
        });
    },

    handleClose(n) {
      this.toggleModalMessage = n;
    },
    handleShowPassword() {
      this.$refs.password.type = "text";
      this.isShowPassword = true;
    },
    handleHidePassword() {
      this.$refs.password.type = "password";
      this.isShowPassword = false;
    },
  },
};
</script>

<style></style>
