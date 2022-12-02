/* eslint-disable prettier/prettier */
const path = require("path");
const fs = require("fs");
const hbjs = require("handbrake-js");
// const getSocketConnection = require("../config/websocket");
module.exports = async (job, settings, options, type) => {
  // console.log("hello from my module: " + action.module);
  // console.log("TESt", job);
  //
  return new Promise((resolve, reject) => {
    console.log("TEST");
    // resolve(attachments);
    let input = options.input || job.output;
    let output = options.output || "encoded.mp4";
    if (!path.isAbsolute(input)) input = path.join(job.workpath, input);
    if (!path.isAbsolute(output)) output = path.join(job.workpath, output);
    console.log("input: ", input);
    console.log("Output: ", output);
    let renderData = {
      renderInput: input,
      renderOutput: output,
    };
    if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require("node-localstorage").LocalStorage;
      localStorage = new LocalStorage("./scratch");
    }

    const data = JSON.stringify(renderData, null, 4);
    localStorage.setItem("inputOutput", data);
    // hbjs
    //   .spawn({ input: input, output: output })
    //   .on("error", (err) => {
    //     // invalid user input, no video found etc
    //   })
    //   .on("progress", (progress) => {
    //     // socket.emit("sendProgress", progress.percentComplete);
    //     // getAttachments(progress.percentComplete);
    //     console.log("Percent complete: %s", progress.percentComplete);
    //   })
    //   .on("complete", (complete) => {
    //     if (options.eraseInput) {
    //       settings.logger.log(
    //         `[${job.uid}] [action-handbrake] erasing input ${input}`
    //       );
    //       fs.unlinkSync(input);
    //     }

    //     settings.logger.log(
    //       `[${job.uid}] [action-handbrake] encoding complete`
    //     );

    //     resolve(job);
    //   });

    // console.log("Input: ", action.input);
    // console.log("Output: ", action.output);
    // let input = options.input || job.output;
    // let output = options.output || "encoded.mp4";
    // if (!path.isAbsolute(input)) input = path.join(job.workpath, input);
    // if (!path.isAbsolute(output)) output = path.join(job.workpath, output);
    // console.log("input: ", input);
    // console.log("Output: ", output);
    // hbjs
    //   .spawn({ input: input, output: output })
    //   .on("error", (err) => {
    //     // invalid user input, no video found etc
    //   })
    //   .on("progress", (progress) => {
    //     // socket.emit("sendProgress", progress.percentComplete);
    //     console.log(
    //       "Percent complete: %s, ETA: %s",
    //       progress.percentComplete,
    //       progress.eta
    //     );
    //   })
    //   .on("complete", (complete) => {
    //     if (options.eraseInput) {
    //       settings.logger.log(
    //         `[${job.uid}] [action-handbrake] erasing input ${input}`
    //       );
    //       fs.unlinkSync(input);
    //     }

    //     settings.logger.log(
    //       `[${job.uid}] [action-handbrake] encoding complete`
    //     );

    //     resolve(job);
    //   });
  });
};
