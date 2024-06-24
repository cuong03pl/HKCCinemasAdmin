import axios from "axios";
import { createStore } from "vuex"; // Import createStore from Vuex
import { UserStore } from "./UserStore";
import { MessageStore } from "./MessageStore";
export default createStore({
  modules: {
    user: UserStore,
    message: MessageStore,
  },
});
