import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/base.css";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/sw.js").then(
      function () {},
      function (err) {
        // registration failed :(
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  });
}

const app = createApp(App);

app.use(router);

app.mount("#app");
