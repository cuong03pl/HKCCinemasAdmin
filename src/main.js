import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import Paginate from "vuejs-paginate-next";

const app = createApp(App);

app.component("Paginate", Paginate);
app.use(router);
app.use(store);
app.mount("#app");
