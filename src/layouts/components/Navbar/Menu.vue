<template>
  <ul class="mb-6 flex flex-col gap-1.5">
    <MenuItem
      v-for="(item, index) in menu_data"
      :key="index"
      :menu_item="item"
    />
  </ul>
</template>

<script>
import DashboardIcon from "@/components/Icon/DashboardIcon.vue";
import MenuItem from "./MenuItem.vue";
import UserIcon from "@/components/Icon/UserIcon.vue";
export default {
  components: { MenuItem, DashboardIcon, UserIcon },
  data() {
    return {
      menu_data: [
        {
          title: "Dashboard",
          to: "/",
          icon: {
            item: DashboardIcon,
            height: 18,
            width: 18,
            fill: "#fff",
          },
        },
        {
          title: "Quản lý User",
          to: "/user-manage",
          icon: {
            item: UserIcon,
            height: 18,
            width: 18,
            fill: "#fff",
          },
        },
        {
          title: "Quản lý Film",
          to: "/film-manage",
          icon: {
            item: UserIcon,
            height: 18,
            width: 18,
            fill: "#fff",
          },
        },
        {
          title: "Quản lý Cinemas",
          to: "/cinemas-manage",
          icon: {
            item: UserIcon,
            height: 18,
            width: 18,
            fill: "#fff",
          },
        },
        {
          title: "Quản lý diễn viên",
          to: "/actor-manage",
          icon: {
            item: UserIcon,
            height: 18,
            width: 18,
            fill: "#fff",
          },
        },
        {
          title: "Quản lý danh mục",
          to: "/category-manage",
          icon: {
            item: UserIcon,
            height: 18,
            width: 18,
            fill: "#fff",
          },
        },
        {
          title: "Quản lý Trailer",
          to: "/trailer-manage",
          icon: {
            item: UserIcon,
            height: 18,
            width: 18,
            fill: "#fff",
          },
        },
        {
          title: "Quản lý rạp chiếu phim mẹ",
          to: "/cinemas-category-manage",
          icon: {
            item: UserIcon,
            height: 18,
            width: 18,
            fill: "#fff",
          },
        },
        {
          title: "Quản lý phòng chiếu",
          to: "/room-manage",
          icon: {
            item: UserIcon,
            height: 18,
            width: 18,
            fill: "#fff",
          },
        },
        {
          title: "Quản lý chỗ ngồi",
          to: "/seat-manage",
          icon: {
            item: UserIcon,
            height: 18,
            width: 18,
            fill: "#fff",
          },
        },
        {
          title: "Quản lý bình luận",
          to: "/comment-manage",
          icon: {
            item: UserIcon,
            height: 18,
            width: 18,
            fill: "#fff",
          },
        },
        {
          title: "Quản lý ngày chiếu",
          to: "/showdate-manage",
          icon: {
            item: UserIcon,
            height: 18,
            width: 18,
            fill: "#fff",
          },
        },
        {
          title: "Quản lý suất chiếu",
          to: "/schedule-manage",
          icon: {
            item: UserIcon,
            height: 18,
            width: 18,
            fill: "#fff",
          },
        },
        {
          title: "Quản lý vé xem",
          to: "/ticket-manage",
          icon: {
            item: UserIcon,
            height: 18,
            width: 18,
            fill: "#fff",
          },
        },
        {
          title: "Quản lý role",
          to: "/role-manage",
          icon: {
            item: UserIcon,
            height: 18,
            width: 18,
            fill: "#fff",
          },
        },
      ],
    };
  },
};
</script>

<style></style>
