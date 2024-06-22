import { createStore } from "vuex"; // Import createStore from Vuex

export default createStore({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, newUser) {
      console.log(newUser);
      state.user = newUser;
    },
  },
  actions: {},
  getters: {},
});
