import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import useConversation from "../../zustand/userConversation"; // A custom hook for managing conversation state using Zustand.
import {
  chatApi, //The API slice created for chat-related endpoints.
  useGetMessagesQuery,
  useGetUserChatsQuery,
  useSendMessageMutation,
} from "../../redux/api/chatApi";  //redux slice function that manage chat and action
import ChatUsers from "./chatUsers";  //it show user chat and this component fetches and displays a list of user chats
import Messages from "./messages";  //it show user messages
import { useDispatch } from "react-redux";  // A Redux hook to dispatch actions.
import NavbarComponent from "../../components/navbar";
import FooterComponent from "../../components/footer";
import { getCurrentUser } from "../../utils/currentUser";  //getting current user data
import { ImSpinner8 } from "react-icons/im";

function Chat() {
  const {
    selectedConversation,
    setSelectedConversation, //State for the currently selected conversation and a function to change it.
    messages,
    setMessages,      //State for messages in the current conversation and a function to set them.
  } = useConversation();
  const [userMessage, setUserMessage] = useState("");  //Local state for the message input by the user.
  const [sendMessage, { isLoading }] = useSendMessageMutation();  //A mutation function to send messages and a boolean indicating if the request is loading.
  const dispatch = useDispatch();  //this function dispatch redux action
  const user = getCurrentUser();   

  const handleSendMessage = async () => {
    if (userMessage === "") return;
    try {
      const data = await sendMessage({
        data: userMessage,
        id: selectedConversation._id,
      }).unwrap();
      setMessages([...messages, data]);  //Adds the new message to the current list.
      dispatch(chatApi.util.invalidateTags(["UserChats"]));  // Refreshes the user's chat data in the Redux store.
      setUserMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    return () => setSelectedConversation("");  //it clear the conversation when component unmount
  }, []);

  return (
    <>
      <NavbarComponent />
      <div className="flex p-4 justify-center bg-gray-100 h-screen ">
        <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden flex  h-[90%]">
          <div className="w-1/4 p-2 border-r border-gray-300 overflow-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">Inbox</h2>           
            <ChatUsers />
          </div>

          <div className="w-3/4 p-2 flex flex-col">
            {selectedConversation ? (
              <>
                <div className="w-full h-12 bg-navy text-white flex items-center">
                  <p className="ml-4">
                    To: {selectedConversation.firstName}{" "}
                    {selectedConversation.lastName}
                  </p>
                </div>
                <div className="mt-2 flex-1 overflow-y-auto bg-gray-50 rounded-lg ">
                  <Messages />
                </div>
                <div className="mt-4 relative bottom-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full p-2 border rounded-lg pr-10"
                    onChange={(e) => setUserMessage(e.target.value)}
                    value={userMessage}
                  />
                  <button
                    className="absolute right-2 top-2 text-blue-500"
                    onClick={handleSendMessage}
                  >
                    {isLoading ? (
                      <ImSpinner8 size={24} className="animate-spin" />
                    ) : (
                      <IoSend size={24} />
                    )}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-gray-500 text-center flex items-center justify-center flex-col flex-1">
                <p>
                  Hello {user?.firstName} {user?.lastName}{" "}
                </p>
                <p>Select a user to start chatting</p>
              </div>
            )}
          </div>
        </div>
      </div>



      <FooterComponent />
    </>
  );
}

export default Chat;
