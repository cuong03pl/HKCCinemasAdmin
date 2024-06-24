import axios from "axios";

export const MessageStore = {
  state: {
    isOpen: false,
    message: "",
  },
  mutations: {
    setNotifyModal(state, payload) {
      console.log(payload);
      state.isOpen = payload.isOpen;
      state.message = payload.message;
    },
  },
  actions: {},
  getters: {
    isOpen: (state) => state.isOpen,
    message: (state) => state.message,
  },
};
