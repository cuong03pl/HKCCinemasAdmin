import DashboardPage from "@/Pages/DashboardPage.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import UserManagePage from "@/Pages/UserManagePage.vue";
import FilmManagePage from "@/Pages/FilmManagePage.vue";
import CinemasManagePage from "@/Pages/CinemasManagePage.vue";
import ActorManagePage from "@/Pages/ActorManagePage.vue";
import TrailerManagePage from "@/Pages/TrailerManagePage.vue";
import CategoryManagePage from "@/Pages/CategoryManagePage.vue";
import CinemasCategoryManagePage from "@/Pages/CinemasCategoryManagePage.vue";
import RoomManagePage from "@/Pages/RoomManagePage.vue";
import SeatManagePage from "@/Pages/SeatManagePage.vue";
import CommentManagePage from "@/Pages/CommentManagePage.vue";
import ShowDateManagePage from "@/Pages/ShowDateManagePage.vue";
import ScheduleManagePage from "@/Pages/ScheduleManagePage.vue";
import TicketManagePage from "@/Pages/TicketManagePage.vue";
import RoleManagePage from "@/Pages/RoleManagePage.vue";
import LoginPage from "@/Pages/LoginPage.vue";
import BookingManagePage from "@/Pages/BookingManagePage.vue";
export const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "/",
        component: DashboardPage,
        meta: { requiresAuth: true, requiresAdmin: true },
      },
      {
        path: "/user-manage",
        component: UserManagePage,
        meta: { requiresAuth: true },
      },
      {
        path: "/film-manage",
        component: FilmManagePage,
        meta: { requiresAuth: true },
      },
      {
        path: "/cinemas-manage",
        component: CinemasManagePage,
        meta: { requiresAuth: true },
      },
      {
        path: "/actor-manage",
        component: ActorManagePage,
        meta: { requiresAuth: true },
      },
      {
        path: "/category-manage",
        component: CategoryManagePage,
        meta: { requiresAuth: true },
      },
      {
        path: "/trailer-manage",
        component: TrailerManagePage,
        meta: { requiresAuth: true },
      },
      {
        path: "/cinemas-category-manage",
        component: CinemasCategoryManagePage,
        meta: { requiresAuth: true },
      },
      {
        path: "/room-manage",
        component: RoomManagePage,
        meta: { requiresAuth: true },
      },
      {
        path: "/seat-manage",
        component: SeatManagePage,
        meta: { requiresAuth: true },
      },
      {
        path: "/comment-manage",
        component: CommentManagePage,
        meta: { requiresAuth: true },
      },
      {
        path: "/showdate-manage",
        component: ShowDateManagePage,
        meta: { requiresAuth: true },
      },
      {
        path: "/ticket-manage",
        component: TicketManagePage,
        meta: { requiresAuth: true },
      },
      {
        path: "/schedule-manage",
        component: ScheduleManagePage,
        meta: { requiresAuth: true },
      },
      {
        path: "/role-manage",
        component: RoleManagePage,
        meta: { requiresAuth: true },
      },
      {
        path: "/book-manage",
        component: BookingManagePage,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/login",
    component: LoginPage,
    meta: { requiresAuth: false, requiresAdmin: false },
  },
];
