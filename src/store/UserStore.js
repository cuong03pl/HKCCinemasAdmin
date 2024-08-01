import axios from "axios";

export const UserStore = {
  state: {
    user: null,
    userRole: null,
    isAdmin: true,
  },
  mutations: {
    setUser(state, newUser) {
      state.user = newUser;
    },
    setUserRole(state, newRole) {
      state.userRole = newRole;
    },
    setIsAdmin(state, isAdmin) {
      state.isAdmin = isAdmin;
    },
  },
  actions: {
    async GetCurrentUser({ commit, dispatch }) {
      try {
        const response = await axios.get(
          "https://hkccinemas.azurewebsites.net/api/Account/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        commit("setUser", response.data);
        await dispatch("handleGetRole", response.data.id);
      } catch (err) {
        console.error(err);
      }
    },

    async handleGetRole({ commit }, userId) {
      await axios
        .post(
          `https://hkccinemas.azurewebsites.net/api/Account/getRolesByUser/${userId}`,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((res) => {
          commit("setUserRole", res.data);
        })
        .catch((err) => {
          if (err.response.status == 401) {
          }
        });
    },
    setIsAdmin({ commit }, isAdmin) {
      commit("setIsAdmin", isAdmin);
    },
  },
  getters: {
    user: (state) => state.user,

    userRole: (state) => state.userRole,
    isAdmin: (state) => state.isAdmin,
  },
};
