import { io, Socket } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:3000"; // Change to your backend URL

let socket: Socket | null = null;

export const connectSocket = () => {
  if (!socket) {
    socket = io(SOCKET_SERVER_URL, { withCredentials: true });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
