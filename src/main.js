/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";
import vuetify from "./plugins/vuetify";
import VueVideoPlayer from "@videojs-player/vue";
import "video.js/dist/video-js.css";
import VueSocketIO from "vue-3-socket.io";
import SocketIO from "socket.io-client";
import JsonViewer from "vue3-json-viewer";
import router from "./router";
import axios from "axios";
import Toast from "vue-toastification";
import VueAxios from "vue-axios";
import "vue-toastification/dist/index.css";

const app = createApp(App);
app.use(
  new VueSocketIO({
    debug: true,
    connection: SocketIO("http://localhost:3030"),
  })
);

const options = {
  // You can set your default options here
};

app.use(Toast, options);
app.use(VueAxios, axios);
app.use(JsonViewer);
registerPlugins(app);
app.use(VueVideoPlayer);
app.use(vuetify).use(router).mount("#app");
