<template>
  <div class="d-flex flex-column">
    <v-card class="d-flex justify-center">
      <v-card title="Image Preview" class="pa-2">
        <v-img
          lazy-src="https://picsum.photos/id/11/10/6"
          color="grey"
          width="400"
          height="300"
          max-height="300"
          max-width="400"
          :src="imgUpload"
        ></v-img>
        <v-select
          v-model="select"
          outlined
          :items="items"
          @update:modelValue="getJsonData(select)"
          :rules="[(v) => !!v || 'Item is required']"
          label="Datei wählen"
          required
        ></v-select>
        <v-select
          v-model="selectae"
          outlined
          :items="itemsAE"
          @update:modelValue="getAEProject"
          :rules="[(v) => !!v || 'Item is required']"
          label="AE Projekt"
          required
        ></v-select>
        <v-text-field
          v-if="Object.keys(jsonData).length !== 0"
          v-model="jsonData.template.composition"
          label="Composition"
          solo
          required
        ></v-text-field>
        <v-file-input
          accept="image/*"
          v-model="image"
          variant="solo"
          @update:modelValue="uploadImage(image)"
          label="File input"
        ></v-file-input>
      </v-card>
      <v-card>
        <v-card-text>
          <div v-for="(val, i) in jsonData.assets" :key="i">
            <v-text-field
              v-if="val.layerName === 'NAME' || val.layerName === 'Headline'"
              v-model="val.value"
              label="Headline"
              solo
              required
            ></v-text-field>
            <v-textarea
              solo
              v-if="val.layerName === 'ZITAT' || val.layerName === 'Zitat'"
              v-model="val.value"
              name="input-7-4"
              label="Zitat eingeben"
            ></v-textarea>
            <v-text-field
              v-if="
                val.layerName === 'FUNKTION' || val.layerName === 'Background'
              "
              label="Output Name"
              v-model="outputFileName"
              solo
              required
            ></v-text-field>
          </div>
          <v-btn
            id="previewBtn"
            :loading="loadingPreview"
            @click="previewRender"
            color="primary"
            >Start Render</v-btn
          >
        </v-card-text>
      </v-card>
      <v-card title="Preview" class="pa-2">
        <video-player
          :src="source"
          :width="400"
          :height="200"
          controls
          :loop="true"
          :volume="0.6"
        />
        <!-- <v-card-actions>
          <v-btn small><v-icon> mdi-play </v-icon></v-btn>
          <v-progress-linear
            class="ml-2"
            color="light-blue"
            height="10"
            value="10"
            striped
          ></v-progress-linear>
        </v-card-actions> -->
        <v-progress-linear
          dark
          class="mt-2"
          v-model="skill"
          color="blue"
          height="25"
        >
          <template v-slot:default="{ value }">
            <strong>{{ Math.ceil(value) }}%</strong>
          </template>
        </v-progress-linear>
        <!-- <v-btn
          class="mt-2"
          :loading="loading"
          depressed
          color="red"
          @click="startRenderJob"
          :disabled="valid"
        >
          Start Render
        </v-btn> -->
      </v-card>
      <v-col cols="2">
        <v-card title="Job Queue">
          <div v-for="n in jobs" :key="n">
            <v-card
              class="ma-2 pa-2"
              v-for="b in n.actions.postrender"
              :key="b"
            >
              <v-toolbar color="primary" :dark="true">
                <v-toolbar-title>{{ b.params }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn size="x-small" icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                  color="red"
                  icon
                  size="x-small"
                  @click="deleteAllJobs(n.uid)"
                  >X</v-btn
                >
              </v-toolbar>

              <v-card-actions>
                <v-btn>Preview Job</v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-card>
      </v-col>
    </v-card>
    <!-- <v-card class="mx-auto mt-2" flat tile>
      <v-card-text>
        <JsonViewer :value="jsonData" copyable boxed sort theme="jv-dark" />
      </v-card-text>
    </v-card> -->
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
export default {
  setup() {
    //const { socket } = useSocketIO();
    //socket.on("welcome", () => {
    //  console.log("welcome");
    //});

    // Get toast interface
    const toast = useToast();
    // These options will override the options defined in the "app.use" plugin registration for this specific toast

    // Make it available inside methods
    return { toast };
  },
  data: () => ({
    jsonData: {},
    items: [],
    itemsAE: [],
    jobQueue: [],
    skill: 0,
    source: "",
    imgUpload: "",
    image: [],
    valid: false,
    valid2: true,
    jobs: [],
    loading: false,
    loadingPreview: false,
    outputFileName: "",
    select: null,
    selectae: null,
    bars: [
      { class: "" },
      { class: "", dark: true },
      { class: "primary", dark: true },
      { class: "elevation-0" },
    ],
  }),
  computed: {
    getJobs() {
      this.jobs.filter((val) => val.state === "error");
    },
  },
  created() {
    // this.jsonData = this.getJsonData();
    // console.log(this.jobs)
    this.axios
      .get("http://localhost:3050/api/v1/jobs", {
        headers: {
          "nexrender-secret": "myapisecret",
        },
      })
      .then((res) => (this.jobs = res.data));
  },
  mounted() {
    document.getElementById("previewBtn").style.display = "none";
  },
  sockets: {
    connect() {
      // Fired when the socket connects.
      console.log("socket connected");
    },
    sendFiles(val) {
      console.log(val);
      this.items = val;
    },
    sendAEFiles(val) {
      console.log(val);
      this.itemsAE = val;
    },
    sendPath(val) {
      console.log("TEST");
      this.jsonData.template.src = "file:///" + val;
      console.log(this.jsonData.template);
    },
    sendRendering(val) {
      console.log(val);
    },
    projectCreated(val) {
      console.log(val);
      this.axios
        .get("http://localhost:3050/api/v1/jobs", {
          headers: {
            "nexrender-secret": "myapisecret",
          },
        })
        .then((res) => (this.jobs = res.data));
      this.toast.success(val);
    },
    FinishJob(val) {
      console.log(val);
      this.$socket.emit("startfinalRender", val);
      this.toast.success(val);
    },
    sendFinished(val) {
      console.log(val);
      this.valid = false;
      this.source = "/" + this.outputFileName + ".mp4";
      this.toast.success(val);
    },
    sendBegin(val) {
      this.toast.success(val);
    },
    sendStarted(val) {
      this.toast.success(val);
    },
    completeProgress(val) {
      console.log(val);
      this.loading = false;
      this.loadingPreview = false;
      this.source = "/" + this.outputFileName + ".mp4";
      this.toast.success(val);
    },
    sendSelectedFile(val) {
      this.jsonData = JSON.parse(val);
      document.getElementById("previewBtn").style.display = "block";
      console.log(document.getElementById("previewBtn").style.display);
    },
    sendProgress(val) {
      this.skill = val;
    },
    disconnect() {
      this.isConnected = false;
    },
    // Fired when the server sends something on the "messageChannel" channel.
    messageChannel(data) {
      this.socketMessage = data;
    },
  },
  methods: {
    previewRender() {
      // let jsonJob = {
      //   data: this.jsonData,
      //   outputName: this.outputFileName,
      // };
      // this.jobQueue.push(jsonJob);
      // console.log(this.jobQueue);
      // localStorage.setItem("queueJobs", JSON.stringify(this.jobQueue));
      // Object.assign(this.jsonData.template, { frameStart: 0, frameEnd: 300 });
      // console.log(this.jsonData.template);
      this.$socket.emit("startPreview", {
        data: this.jsonData,
        outputName: this.outputFileName,
      });
      this.loadingPreview = true;
    },
    updateJob() {},
    startRenderJob() {
      // console.log(this.jsonData);
      // let originalJob = JSON.parse(localStorage.getItem("queueJobs"));
      // console.log(
      //   originalJob.find(
      //     (element) => element.outputName === this.outputFileName
      //   )
      // );
      // let jobObj = originalJob.find(
      //   (element) => element.outputName === this.outputFileName
      // );
      this.$socket.emit("startRender");
      this.loading = true;
    },
    getAEProject() {
      this.$socket.emit("getPath", this.selectae);
      // this.jsonData.template.src = this.selectae
      // console.log(this.jsonData.template.src)
    },
    getJsonData(val) {
      console.log(val);
      if (val === undefined)
        return {
          template: {
            src: "",
            composition: "",
          },
          assets: [],
          actions: {
            postrender: [],
          },
        };
      console.log(val);
      this.$socket.emit("selectedFile", val);
      this.filename = val.replaceAll(".json", "");
    },
    deleteAllJobs(val) {
      this.axios
        .delete("http://localhost:3050/api/v1/jobs/" + val, {
          headers: {
            "nexrender-secret": "myapisecret",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            this.axios
              .get("http://localhost:3050/api/v1/jobs", {
                headers: {
                  "nexrender-secret": "myapisecret",
                },
              })
              .then((res) => (this.jobs = res.data));
          }
        });
    },
    uploadImage(val) {
      console.log(val[0]);
      this.$socket.emit(
        "upload",
        { img: val[0], imgTitle: val[0].name },
        (status) => {
          console.log(status);
          if (status.message === "success") {
            this.imgUpload = "/img/" + val[0].name;
            for (let i = 0; i < this.jsonData.assets.length; i++) {
              if (this.jsonData.assets[i].type === "image") {
                this.jsonData.assets[i].src =
                  "file:///C:/Users/mazlum/downloads/" + val[0].name;
                console.log(this.jsonData.assets[i]);
              }
            }
          }
        }
      );
    },
  },
};
</script>
