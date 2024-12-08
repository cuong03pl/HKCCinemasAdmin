import { createRouter, createWebHistory } from "vue-router";
import { routes } from "../../config/routes";
import store from "@/store/store";
import NotifyModal from "@/components/Modal/NotifyModal.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});
// router.beforeEach((to, from, next) => {
//   const loggedIn = !!store.getters["user"];
//   if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
//     next({ path: "/login" });
//   } else {
//     if (to.matched.some((record) => record.meta.requiresAdmin)) {
//       var data = store.getters.userRole.filter(
//         (res) => res.normalizedName == "ADMIN"
//       );
//       if (data.length > 0) {
//         // store.commit("setNotifyModal", {
//         //   isOpen: true,
//         //   message: "Đăng nhập thành công",
//         // });
//         next();
//       } else {
//         store.commit("setNotifyModal", {
//           isOpen: true,
//           message: "Bạn không có quyền truy cập trang này",
//         });
//       }
//     } else next();
//   }
// });
export default router;
