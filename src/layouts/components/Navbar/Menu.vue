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
          title: "Quản lý danh mục phim",
          to: "/category-manage",
          icon: {
            item: CategoryIcon,
            height: 18,
            width: 18,
            fill: "#fff",
          },
        },
        {
          title: "Quản lý phim",
          to: "/film-manage",
          icon: {
            item: FilmIcon,
            height: 18,
            width: 18,
            fill: "#fff",
          },
        },
        {
          title: "Quản lý rạp chiếu phim mẹ",
          to: "/cinemas-category-manage",
          icon: {
            item: CinemasCategoryIcon,
            height: 18,
            width: 18,
            fill: "#fff",
          },
        },
        {
          title: "Quản lý rạp chiếu",
          to: "/cinemas-manage",
          icon: {
            item: CinemasIcon,
            height: 18,
            width: 18,
            fill: "#fff",
          },
        },
        {
          title: "Quản lý phòng chiếu",
          to: "/room-manage",
          icon: {
            item: RoomIcon,
            height: 18,
            width: 18,
            fill: "#fff",
          },
        },
        {
          title: "Quản lý diễn viên",
          to: "/actor-manage",
          icon: {
            item: ActorIcon,
            height: 18,
            width: 18,
            fill: "#fff",
          },
        },

        {
          title: "Quản lý trailer",
          to: "/trailer-manage",
          icon: {
            item: TrailerIcon,
            height: 18,
            width: 18,
            fill: "#fff",
          },
        },

        {
          title: "Quản lý chỗ ngồi",
          to: "/seat-manage",
          icon: {
            item: SeatIcon,
            height: 18,
            width: 18,
            fill: "#fff",
          },
        },
        {
          title: "Quản lý bình luận",
          to: "/comment-manage",
          icon: {
            item: CommentIcon,
            height: 18,
            width: 18,
            fill: "#fff",
          },
        },
        {
          title: "Quản lý ngày chiếu",
          to: "/showdate-manage",
          icon: {
            item: DateIcon,
            height: 18,
            width: 18,
            fill: "#fff",
          },
        },
        {
          title: "Quản lý suất chiếu",
          to: "/schedule-manage",
          icon: {
            item: ScheduleIcon,
            height: 18,
            width: 18,
            fill: "#fff",
          },
        },
        {
          title: "Quản lý vé xem",
          to: "/ticket-manage",
          icon: {
            item: TicketIcon,
            height: 18,
            width: 18,
            fill: "#fff",
          },
        },
        {
          title: "Quản lý đặt vé",
          to: "/book-manage",
          icon: {
            item: TicketIcon,
            height: 18,
            width: 18,
            fill: "#fff",
          },
        },

        {
          title: "Quản lý người dùng",
          to: "/user-manage",
          icon: {
            item: UserIcon,
            height: 18,
            width: 18,
            fill: "#fff",
          },
        },
        {
          title: "Quản lý vai trò",
          to: "/role-manage",
          icon: {
            item: RoleIcon,
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
