<template>
  <ul class="pb-2 space-y-2">
    <li v-for="(item, index) in menu_data" :key="index">
      <button
        type="button"
        @click="handleMenu(index)"
        class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
      >
        <component
          :is="item.icon.item"
          :height="item.icon.height"
          :width="item.icon.width"
          :fill="item.icon.fill"
        />
        <span class="flex-1 ml-3 text-left whitespace-nowrap">{{
          item.group_title
        }}</span>
        <svg
          class="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <ul
        :class="{ hidden: !activeMenu.includes(index), 'py-2 space-y-2': true }"
      >
        <MenuItem
          v-for="(item, index) in item.items"
          :key="index"
          :menu_item="item"
        />
      </ul>
    </li>
  </ul>
</template>

<script>
import DashboardIcon from "@/components/Icon/DashboardIcon.vue";
import MenuItem from "./MenuItem.vue";
import UserIcon from "@/components/Icon/UserIcon.vue";
import FilmIcon from "@/components/Icon/FilmIcon.vue";
import CinemasIcon from "@/components/Icon/CinemasIcon.vue";
import ActorIcon from "@/components/Icon/ActorIcon.vue";
import CategoryIcon from "@/components/Icon/CategoryIcon.vue";
import TrailerIcon from "@/components/Icon/TrailerIcon.vue";
import TicketIcon from "@/components/Icon/TicketIcon.vue";
import RoleIcon from "@/components/Icon/RoleIcon.vue";
import ScheduleIcon from "@/components/Icon/ScheduleIcon.vue";
import RoomIcon from "@/components/Icon/RoomIcon.vue";
import SeatIcon from "@/components/Icon/SeatIcon.vue";
import CommentIcon from "@/components/Icon/CommentIcon.vue";
import DateIcon from "@/components/Icon/DateIcon.vue";
import CinemasCategoryIcon from "@/components/Icon/CinemasCategoryIcon.vue";
export default {
  components: {
    MenuItem,
    DashboardIcon,
    UserIcon,
    FilmIcon,
    CinemasIcon,
    ActorIcon,
    CategoryIcon,
    TrailerIcon,
    TicketIcon,
    ScheduleIcon,
    RoleIcon,
    RoomIcon,
    SeatIcon,
    CommentIcon,
    DateIcon,
    CinemasCategoryIcon,
  },
  data() {
    return {
      menu_data: [
        {
          group_title: "Tổng quan",
          icon: {
            item: DashboardIcon,
            height: 18,
            width: 18,
            fill: "#fff",
          },
          items: [
            {
              title: "Dashboard",
              to: "/",
            },
          ],
        },
        {
          group_title: "Quản lý phim",
          icon: {
            item: FilmIcon,
            height: 18,
            width: 18,
            fill: "#fff",
          },
          items: [
            {
              title: "Quản lý danh mục phim",
              to: "/category-manage",
            },
            {
              title: "Quản lý phim",
              to: "/film-manage",
            },
            {
              title: "Quản lý trailer",
              to: "/trailer-manage",
            },
            {
              title: "Quản lý diễn viên",
              to: "/actor-manage",
            },
          ],
        },
        {
          group_title: "Quản lý rạp chiếu",
          icon: {
            item: CinemasCategoryIcon,
            height: 18,
            width: 18,
            fill: "#fff",
          },
          items: [
            {
              title: "Quản lý công ty",
              to: "/cinemas-category-manage",
            },
            {
              title: "Quản lý rạp chiếu",
              to: "/cinemas-manage",
            },
            {
              title: "Quản lý phòng chiếu",
              to: "/room-manage",
            },
            {
              title: "Quản lý chỗ ngồi",
              to: "/seat-manage",
            },
          ],
        },
        {
          group_title: "Quản lý lịch chiếu",
          icon: {
            item: DateIcon,
            height: 18,
            width: 18,
            fill: "#fff",
          },
          items: [
            {
              title: "Quản lý ngày chiếu",
              to: "/showdate-manage",
            },
            {
              title: "Quản lý suất chiếu",
              to: "/schedule-manage",
            },
            {
              title: "Quản lý vé xem",
              to: "/ticket-manage",
            },
            {
              title: "Quản lý đặt vé",
              to: "/book-manage",
            },
          ],
        },
        {
          group_title: "Quản lý người dùng",
          icon: {
            item: UserIcon,
            height: 18,
            width: 18,
            fill: "#fff",
          },
          items: [
            {
              title: "Quản lý người dùng",
              to: "/user-manage",
            },
            {
              title: "Quản lý vai trò",
              to: "/role-manage",
            },
          ],
        },
      ],
      activeMenu: [],
    };
  },
  methods: {
    handleMenu(id) {
      if (this.activeMenu.includes(id)) {
        this.activeMenu = this.activeMenu.filter((items) => items !== id);
      } else {
        this.activeMenu = [...this.activeMenu, id];
      }
    },
  },
};
</script>

<style></style>
