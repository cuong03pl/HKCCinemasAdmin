// import "vuetify/styles";
import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import Paginate from "vuejs-paginate-next";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
const vuetify = createVuetify({
  components,
  directives,
});
const app = createApp(App);

app.component("Paginate", Paginate);
app.use(router);
app.use(store);
app.use(vuetify);
app.mount("#app");
