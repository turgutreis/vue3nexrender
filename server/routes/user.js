/* eslint-disable prettier/prettier */
var express = require("express");
var router = express.Router();
var multer = require("multer");
const hbjs = require("handbrake-js");
const { start } = require("@nexrender/worker");
const getSocketConnection = require("../config/websocket");
const { createClient } = require("@nexrender/api");
// const { createHandler } = require("@nexrender/server");
var path = require("path");
var fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
/* eslint-disable prettier/prettier */

getSocketConnection.ioConnection.on("connection", (socket) => {
  var files = fs.readdirSync("../../NexRender");
  console.log("client connected");
  socket.emit("sendFiles", files);
  socket.on("selectedFile", function (msg) {
    fs.readFile("../../NexRender/" + msg, "utf8", function read(err, data) {
      if (err) {
        throw err;
      }
      socket.emit("sendSelectedFile", data);
    });
  });
  const client = createClient({
    host: "http://localhost:3050",
    secret: "myapisecret",
  });

  socket.on("startPreRender", function (msg) {
    console.log(msg);
    const main = async () => {
      const result = await client.addJob({
        template: msg.data.template,
        assets: msg.data.assets,
        actions: {
          postrender: [
            {
              module:
                "C:/Users/mazlum/Downloads/vuetifyproject/server/mymodule/index.js",
              preset: "mp4",
              output:
                "C:/Users/mazlum/downloads/vuetifyproject/public/" +
                msg.outputName +
                ".mp4",
              params: msg.outputName,
            },
          ],
        },
        onChange: (job, state) => {
          console.log("TEST");
        },
        onRenderProgress: (job, value) => console.log("JERRY"),
      });
      result.on(
        "created",
        (job) => {
          socket.emit("projectCreated", "created");
        }
      );
    };
    main().catch(console.error);
  });
  // if (typeof localStorage === "undefined" || localStorage === null) {
  //   var LocalStorage = require("node-localstorage").LocalStorage;
  //   localStorage = new LocalStorage("./scratch");
  // }

  const main = async () => {
    const serverHost = "http://localhost:3050";
    const serverSecret = "myapisecret";

    socket.on("startRender", async function () {
      await start(serverHost, serverSecret, {
        workpath: "/Users/mazlum/.nexrender/",
        binary: "/Users/mazlum/Applications/aerender",
        skipCleanup: true,
        addLicense: false,
        debug: true,
        actions: {
          "custom-action": (job, settings, { input, params }, type) => {
            // Custom action code
          },
        },
      });
    });
  };

  main().catch(console.error);

  // const regex = /\.mp4/i;
  // let input = JSON.parse(localStorage.getItem("inputOutput")).renderInput;
  // let output = JSON.parse(localStorage.getItem("inputOutput")).renderOutput;
  // let newOutput = output.replace(regex, "_final.mp4");
  // hbjs
  //   .spawn({
  //     input: input,
  //     output: newOutput,
  //   })
  //   .on("error", (err) => {
  //     // invalid user input, no video found etc
  //   })
  //   .on("progress", (progress) => {
  //     socket.emit("sendProgress", progress.percentComplete.toFixed());
  //   })
  //   .on("complete", (complete) => {
  //     socket.emit("completeProgress", "complete");
  //     // }
  //   });
  socket.on("sendVideoName", function (msg) {
    const logo = path.resolve("../../videos/" + msg);
    socket.emit("sendSelectedVideo", logo);
  });
  socket.on("upload", (file, callback) => {
    console.log(file); // <Buffer 25 50 44 ...>

    // save the content to the disk, for example
    fs.writeFile("../public/img/" + file.imgTitle, file.img, (err) => {
      callback({ message: err ? "failure" : "success" });
    });
  });
  socket.on("disconnect", async () => {
    console.log(`Client disconnected [id=${socket.id}]`);
  });
});

module.exports = router;
