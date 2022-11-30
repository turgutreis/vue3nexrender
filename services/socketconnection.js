/* eslint-disable prettier/prettier */
import { io } from "socket.io-client";

// eslint-disable-next-line no-undef
class SocketioService {
  // eslint-disable-next-line no-undef
  socket;
  constructor() {}

  setupSocketConnection() {
    this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);
  }
}
export default new SocketioService();