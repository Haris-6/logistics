import React from "react";
import { getCurrentUser } from "../../utils/currentUser";
import moment from "moment";  //A library for parsing, validating, manipulating, and formatting dates.

function Message({ obj }) {
  const user = getCurrentUser();
  const { message, senderId, createdAt } = obj;  //it contain message detail

  const isSentByCurrentUser = senderId === user._id;
  const formattedTime = moment(createdAt).format("hh:mm A");
 


  return (
    <div
      className={`flex mb-2 ${
        isSentByCurrentUser ? "justify-end" : "justify-start"
      }`}
    >
      <div className="flex flex-col">
        <div
          className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
            isSentByCurrentUser
              ? "bg-green-200 text-right"
              : "bg-blue-200 text-left"
          }`}
        >
          <p>{message}</p>
        </div>
        <p className="text-xs text-gray-500 mt-1">{formattedTime}</p>
      </div>
    </div>
  );
}

export default Message;
