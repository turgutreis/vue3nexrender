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
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App);
app.use(
  new VueSocketIO({
    debug: true,
    connection: SocketIO("http://localhost:3030"),
  })
);
app.use(VueAxios, axios)
app.use(JsonViewer);
registerPlugins(app);
app.use(VueVideoPlayer);
app.use(vuetify).mount("#app");
