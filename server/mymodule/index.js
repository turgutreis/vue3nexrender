/* eslint-disable prettier/prettier */
// mymodule.js
const path = require("path");
const fs = require("fs");
const hbjs = require("handbrake-js");
module.exports = async (job, settings, options, type) => {
  return new Promise((resolve, reject) => {
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
    hbjs
      .spawn({ input: input, output: output, preset: "Very Fast 480p30" })
      .on("error", (err) => {
        // invalid user input, no video found etc
      })
      .on("progress", (progress) => {
        console.log("Percent complete: %s", progress.percentComplete);
      })
      .on("complete", (complete) => {
        if (options.eraseInput) {
          settings.logger.log(
            `[${job.uid}] [action-handbrake] erasing input ${input}`
          );
          fs.unlinkSync(input);
        }

        settings.logger.log(
          `[${job.uid}] [action-handbrake] encoding complete`
        );

        resolve(job);
      });

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
