import { useEffect, useState } from "react";
import { connectSocket, disconnectSocket, getSocket } from "../lib/socket";

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = connectSocket();

    socket.on("connect", () => {
      console.log("Connected to WebSocket");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket");
      setIsConnected(false);
    });

    return () => {
      disconnectSocket();
    };
  }, []);

  return { socket: getSocket(), isConnected };
};
