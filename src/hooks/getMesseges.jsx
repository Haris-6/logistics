import { useEffect, useState } from "react";
import useConversation from "../zustand/userConversation";
import { toast } from "react-toastify";
import { getToken } from "../utils/currentUser";
const BASE_URL = import.meta.env.VITE_BASE_URL;


const useGetMesseges = () => {
  const { messages, setMessages, selectedConversation } = useConversation();
  const [loading, setLoading] = useState(false);
  const token = getToken();


  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${BASE_URL}/message/${selectedConversation._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setMessages(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error.messeges);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};

export default useGetMesseges;
