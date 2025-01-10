import React, { useEffect, useRef } from "react";  //useref creating references to DOM elements
import useGetMesseges from "../../hooks/getMesseges"; // A custom hook for fetching messages.
import MessagesSkeleton from "../../shimmer/message";
import Message from "./message";  //A component that renders individual messages.
import useListenMessage from "../../hooks/useListenMessage"; // A custom hook for listening to incoming messages or updates.


function Messages() {
  const { messages, loading } = useGetMesseges();
  const scrollRef = useRef(null);
  useListenMessage();  // A hook likely used to set up a listener for incoming messages or real-time updates.

  useEffect(() => {
    setTimeout(() => {  //Delays the scrolling action slightly to ensure new messages have rendered.
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100); 
  }, [messages]);

  return (
    <div
      className="p-4 bg-gray-50 h-full rounded-lg overflow-y-auto"
      ref={scrollRef}
    >
      {loading ? (
        <MessagesSkeleton />
      ) : (
        messages?.map((message, i) => (
          <div key={i}>
            <Message obj={message} />
          </div>
        ))
      )}
    </div>
  );
}

export default Messages;
