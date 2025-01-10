import React, { useEffect } from "react";
import { useGetUserChatsQuery } from "../../redux/api/chatApi";  //A hook from the chatApi slice for fetching user chat data.
import User from "./user";
import { useLocation } from "react-router-dom"; //this useful to getting path name
import SpinnerComponent from "../../components/spinner";


function ChatUsers() {
  const { data, refetch, isLoading } = useGetUserChatsQuery();
  const history = useLocation();

  useEffect(() => {
    refetch();
  }, [history, refetch]);

  return (
    <div className="flex flex-col gap-4 ">

      {isLoading ? (
        <SpinnerComponent />
      ) : (
        data?.map((obj, i) => <User data={obj} key={i} index={i} length={data?.length}/> )
      )}
    </div>
  );
}

export default ChatUsers;
