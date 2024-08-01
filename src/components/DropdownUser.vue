<template>
  <div class="flex items-center w-full">
    <Tippy
      v-if="user"
      class="min-w-[40px] cursor-pointer"
      ref="tooltip"
      trigger="click"
      interactive="true"
      placement="bottom"
    >
      <div class="flex items-center">
        <span class="mr-2 text-base text-textPrimary">
          {{ user.userName }}
        </span>
        <Images
          :src="user.avatar"
          alt=""
          class="w-[30px] cursor-pointer h-[30px] rounded-[50%]"
        />
      </div>
      <template #content>
        <MenuUser :data="this.menuDataUser" />
      </template>
    </Tippy>

    <Button v-if="!user" loginBtn to="/login" title="Đăng nhập"></Button>
  </div>
</template>

<script>
import axios from "axios";
import LogoutIcon from "./Icon/LogoutIcon.vue";
import SettingIcon from "./Icon/SettingIcon.vue";
import UserIcon from "./Icon/UserIcon.vue";
import Button from "@/components/Button/Button.vue";
import Images from "./Images/Images.vue";
import { Tippy } from "vue-tippy";
import MenuUser from "./MenuUser/MenuUser.vue";
export default {
  components: { Button, Images, Tippy, MenuUser },
  data() {
    return {
      dropdownOpen: false,
      menuDataUser: [
        {
          title: "Đăng xuất",
          to: null,
          icon: {
            item: LogoutIcon,
            class: "h-5 w-5",
          },
          action: this.handleLogOut,
        },
      ],
    };
  },
  mounted() {
    this.GetCurrentUser();
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    },
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    openDropdown() {
      this.dropdownOpen = true;
    },
    closeDropdown() {
      this.dropdownOpen = false;
    },

    async GetCurrentUser() {
      await axios
        .get("https://hkccinemas.azurewebsites.net/api/Account/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Gửi token JWT trong tiêu đề Authorization
          },
        })
        .then((res) => {
          this.$store.commit("setUser", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleLogOut() {
      localStorage.removeItem("token");
      window.location.reload(true);
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
