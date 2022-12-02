/* eslint-disable prettier/prettier */
// const express = require("express");
// const cors = require("cors");
const config = require("./config/websocket");
let user = require("./routes/user");
let test = require("./mymodule/index");
const { start } = require("@nexrender/worker");
// const ftp = require("basic-ftp") 
// const app = express();

config.app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// const port = 3000;
// const secret = "myapisecret";

// const settings = {
//   port: process.env.PORT || 3030,
// };
// configapp.use(cors(settings));

// parse requests of content-type - application/json
// app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));

// example()

// async function example() {
//     const client = new ftp.Client()
//     client.ftp.verbose = true
//     try {
//         await client.access({
//             host: "0.0.0.0:21",
//             user: "admin",
//             password: "d3Ali89x",
//             secure: true
//         })
//         console.log(await client.list())
//         // await client.uploadFrom("README.md", "README_FTP.md")
//         // await client.downloadTo("README_COPY.md", "README_FTP.md")
//     }
//     catch(err) {
//         console.log(err)
//     }
//     client.close()
// }

config.app.use("/user", user);
config.app.use("/test", test);
// simple route
config.app.get("/", (req, res) => {
  res.json({ message: "Welcome to Vue-Infobox application." });
});

// const client = createClient({
//   host: "http://localhost:3000",
//   secret: "myapisecret",
// });

// const main = async () => {
//   const result = await client.addJob({
//     template: {
//       src: "file:///C:/Users/mazlum/downloads/testprojekt.aep",
//       composition: "testkomp",
//     },
//     assets: [
//       {
//         type: "data",
//         layerName: "bestesspiel",
//         property: "Source Text",
//         value: "Das ist hier noch ein Test!!!!",
//       },
//       {
//         type: "video",
//         src: "file:///C:/Users/mazlum/downloads/IcewindDaleSkeleton.mp4",
//         layerName: "IcewindDaleSkeleton.mp4",
//       },
//     ],
//     actions: {
//       postrender: [
//         {
//           module: "@nexrender/action-encode",
//           preset: "mp4",
//           output: "C:/Users/mazlum/downloads/test5.mp4",
//         },
//       ],
//     },
//   });

//   result.on("created", (job) => console.log("project has been created"));
//   result.on("started", (job) => console.log("project rendering started"));
//   result.on("progress", (job, percents) =>
//     console.log("project is at: " + percents + "%")
//   );
//   result.on("finished", (job) => console.log("project rendering finished"));
//   result.on("error", (err) => console.log("project rendering error", err));
// };

const main = async () => {
  const serverHost = "http://localhost:3050";
  const serverSecret = "myapisecret";

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
};

main().catch(console.error);


// set port, listen for requests
// server.listen(port, secret, () => {
//   console.log(`Server is running on port ${port}.`);
// });

module.exports = config;
