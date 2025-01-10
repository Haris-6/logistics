import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { getCurrentUser } from "../utils/currentUser";

let URL = import.meta.env.VITE_BASE_URL;

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const user = getCurrentUser();
  URL = URL.slice(0, -7);

  useEffect(() => {
    if (user) {
      const socket = io(URL, {
        query: {
          userId: user?._id,
        },
      });
      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.disconnect();
      };
    } else {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    }
  }, []);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
