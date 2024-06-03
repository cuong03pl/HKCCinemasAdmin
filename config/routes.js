import HomePage from "@/Pages/HomePage.vue"
import DashboardPage from "@/Pages/DashboardPage.vue"
import DefaultLayout from "@/layouts/DefaultLayout.vue"
import UserManagePage from "@/Pages/UserManagePage.vue"
import FilmManagePage from "@/Pages/FilmManagePage.vue"
import CinemasManagePage from "@/Pages/CinemasManagePage.vue"
import ActorManagePage from "@/Pages/ActorManagePage.vue"
import TrailerManagePage from "@/Pages/TrailerManagePage.vue"
import CategoryManagePage from "@/Pages/CategoryManagePage.vue"
import CinemasCategoryManagePage from "@/Pages/CinemasCategoryManagePage.vue"
import RoomManagePage from "@/Pages/RoomManagePage.vue"
import SeatManagePage from "@/Pages/SeatManagePage.vue"
import CommentManagePage from "@/Pages/CommentManagePage.vue"
import ShowDateManagePage from "@/Pages/ShowDateManagePage.vue"
import ScheduleManagePage from "@/Pages/ScheduleManagePage.vue"


export  const routes =   [
    {
      path: "/",
      component: DefaultLayout,
      children: [
        { path: "/dashboard", component: DashboardPage },
        { path: "/home", component: HomePage },
        {path: "/user-manage", component: UserManagePage},
        {path: "/film-manage", component: FilmManagePage},
        {path: "/cinemas-manage", component: CinemasManagePage},
        {path: "/actor-manage", component: ActorManagePage},
        {path: "/category-manage", component: CategoryManagePage},
        {path: "/trailer-manage", component: TrailerManagePage},
        {path: "/cinemas-category-manage", component: CinemasCategoryManagePage},
        {path: "/room-manage", component: RoomManagePage},
        {path: "/seat-manage", component: SeatManagePage},
        {path: "/comment-manage", component: CommentManagePage},
        {path: "/showdate-manage", component: ShowDateManagePage},
        {path: "/schedule-manage", component: ScheduleManagePage},
      ]
    }
  ]
