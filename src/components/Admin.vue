<template>
  <div class="d-flex flex-column">
    <v-card class="d-flex justify-center mt-2">
      <v-card title="Heading" class="pa-2" flat>
        <v-img
          lazy-src="https://picsum.photos/id/11/10/6"
          src="https://picsum.photos/id/11/10/6"
          color="grey"
          width="400"
          height="300"
          max-height="300"
          max-width="400"
        ></v-img>
      </v-card>
      <v-card flat>
        <v-card-text>
          <div>
            <v-text-field label="Headline" solo required></v-text-field>
            <v-textarea
              solo
              name="input-7-4"
              label="Zitat eingeben"
            ></v-textarea>
          </div>
        </v-card-text>
      </v-card>
      <v-card width="300" title="File Input" flat>
        <v-card-actions>
          <v-file-input
            variant="solo"
            v-model="afterEffect"
            @update:modelValue="uploadAEProject"
            label="Upload After Effects Project"
          ></v-file-input>
        </v-card-actions>
        <v-card-text>
          <JsonViewer :value="jsonData" copyable boxed sort theme="jv-dark" />
        </v-card-text>
        <v-file-input
          variant="solo"
          v-model="jsonData"
          @update:modelValue="getJsonData"
          label="Upload After Effects Assets"
        ></v-file-input>
      </v-card>
    </v-card>
  </div>
</template>

<script>
const BASE_URL = "http://localhost:3030";
export default {
  data: () => ({
    jsonData: [],
    afterEffect: [],
    items: [],
    jobQueue: [],
    file: [],
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
    bars: [
      { class: "" },
      { class: "", dark: true },
      { class: "primary", dark: true },
      { class: "elevation-0" },
    ],
  }),
  sockets: {
    senduploadedFile(val) {
      this.jsonData = JSON.parse(val);
    },
  },
  methods: {
    uploadImage(val) {
      if (this.file === null) return;
      console.log(this.file);
      const FileData = new FormData();
      FileData.append("file", this.file);
      try {
        this.axios
          .post(`${BASE_URL}/user/upload`, FileData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((resp) => {
            console.log(resp.data);
          });
      } catch (err) {
        console.error(err);
        return;
      }
    },
    uploadAEProject() {
      console.log(this.afterEffect);
      const FileData = new FormData();
      FileData.append("file", this.afterEffect[0]);
      try {
        this.axios
          .post(`${BASE_URL}/user/upload`, FileData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((resp) => {
            console.log(resp.data);
          });
      } catch (err) {
        console.error(err);
        return;
      }
    },
    getJsonData() {
      // if (val === undefined)
      // return {
      //   template: {
      //     src: "",
      //     composition: "",
      //   },
      //   assets: [],
      //   actions: {
      //     postrender: [],
      //   },
      // };
      console.log(this.jsonData);
      const FileData = new FormData();
      FileData.append("file", this.jsonData[0]);
      try {
        this.axios
          .post(`${BASE_URL}/user/upload`, FileData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((resp) => {
            console.log(resp.data);
          });
      } catch (err) {
        console.error(err);
        return;
      }
    },
  },
};
</script>
