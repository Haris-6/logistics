import { Avatar } from "flowbite-react";
import React, { useEffect } from "react";
import useConversation from "../../zustand/userConversation";

function User({ data,index,length }) {
  const { _id, firstName, lastName } = data;
  const { selectedConversation, setSelectedConversation } = useConversation();
  const handleSelectedUser = () => {
    setSelectedConversation(data);
  };

  return (
    <div
      className={`flex p-2 items-center gap-4  cursor-pointer ${index !== length-1 ? "border-b":""}`}
      onClick={handleSelectedUser}
    >
      <Avatar rounded></Avatar>
      <p className="">
        {firstName} {lastName}{" "}
      </p>
    </div>
  );
}

export default User;
