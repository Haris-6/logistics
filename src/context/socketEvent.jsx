// src/socketService.js
import { io } from "socket.io-client";
let URL = import.meta.env.VITE_BASE_URL;
URL = URL.slice(0, -7);  //it remove last 7 character of url for correct path

let socket;

const connectToSocket = (id) => { //initialize the socket
  if (!socket) {
    socket = io(URL, {
      query: { userId: id },
    });

    socket.on("connect", () => {
      console.log("Connected to socket server with ID:", id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });
  }

  return socket;
};

const getSocket = () => {
  if (!socket) {
    throw new Error("Socket not connected. Call connectToSocket first.");
  }
  return socket;
};

export { connectToSocket, getSocket };
