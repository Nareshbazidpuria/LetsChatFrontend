import { io } from "socket.io-client";
const socketUrl = process.env.WDS_SOCKET_PATH;
export let socket = io(socketUrl, {
  auth: { token: localStorage.accessToken },
});

export const connectToSocketApi = () =>
  (socket = io(socketUrl, { auth: { token: localStorage.accessToken } }));
