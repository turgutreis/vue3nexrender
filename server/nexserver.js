/* eslint-disable prettier/prettier */
const server = require("@nexrender/server");

const port = 3050;
const secret = "myapisecret";

server.listen(port, secret, () => {
  console.log(`Server is running on port ${port}.`);
});
