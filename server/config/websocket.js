/* eslint-disable prettier/prettier */
const express = require("express");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
// const globalIP = "https://stellular-brigadeiros-ee6bbc.netlify.app";
const localIP = "http://127.0.0.1:3000";
const io = require("socket.io")(server, {
  cors: {
    origin: localIP,
  },
  maxHttpBufferSize: 1e8, // 100 MB
});
const settings = {
  port: process.env.PORT || 3030,
};

// set port, listen for requests
server.listen(settings.port, () => {
  console.log(`Server is running on port ${settings.port}.`);
});

app.use(cors(settings));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

module.exports = { ioConnection: io, app: app };
