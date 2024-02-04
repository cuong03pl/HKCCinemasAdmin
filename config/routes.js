import HomePage from "@/Pages/HomePage.vue"
import DashboardPage from "@/Pages/DashboardPage.vue"
import DefaultLayout from "@/layouts/DefaultLayout.vue"
import UserManagePage from "@/Pages/UserManagePage.vue"
import FilmManagePage from "@/Pages/FilmManagePage.vue"
import CinemasManagePage from "@/Pages/CinemasManagePage.vue"

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
export  const routes =   [
    {
      path: "/",
      component: DefaultLayout,
      children: [
        { path: "/dashboard", component: DashboardPage },
        { path: "/home", component: HomePage },
        {path: "/user-manage", component: UserManagePage},
        {path: "/film-manage", component: FilmManagePage},
        {path: "/cinemas-manage", component: CinemasManagePage}
      ]
    }
  ]
