import React, { useEffect } from "react";
import { useSocketContext } from "../context/socket";
import useConversation from "../zustand/userConversation";//it is used for managing conversation-related state, such as the messages in a chat.
import { getSocket } from "../context/socketEvent";//it is resposible for initial or retriving socket connection

function useListenMessage() { //this encapsulate reusable logic related to state or side effects.
  // const {socket} = useSocketContext()
  const { messages, setMessages } = useConversation();

  const socket = getSocket(); //it retrive the socket connection

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      console.log(newMessage);
      setMessages([...messages, newMessage]);
    });

    return () => socket?.off("newMessage");
  }, [socket, messages, setMessages]);
}

export default useListenMessage;
