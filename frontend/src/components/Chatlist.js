import React, { useEffect, useState } from "react";
import SearchBar from "./Searchbar";
import ChatCard from "./ChatCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Personalchatconatiner from "./Personalchatconatiner";

const Chatlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((store) => store.User.usertoken);
  const [finalData, setfinalData] = useState([]);
  const [chatitemlen, setchatitemlen] = useState(0);

  useEffect(() => {
    const getchats = async () => {
      const res = await fetch(`/api/v1/chats/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.message === "you are not logged in. Login to continue..") {
        navigate("/login");
      } else {
        setfinalData(data.data.recentChats);
        setchatitemlen(data.result);
      }
    };
    getchats();
  }, []); // Empty dependency array to run the effect once on component mount

  return !finalData ? (
    <div>Loading...</div>
  ) : (
    <div className="bg-purple-700 text-white p-3 flex w-full justify-evenly">
      <div className="bg-purple-700 text-gray-800 p-4 rounded-md">
        <SearchBar />
        <div
          className="h-[29rem] 
      overflow-y-scroll scrollbar-thumb-pink-600 scrollbar-track-pink-300 bg-pink-400 rounded-2xl mt-4 p-4 mb-2 scrollbar-thin"
        >
          {chatitemlen === 0 ? (
            <div className="flex justify-center text-gray-800 font-bold text-xl">
              No recent Chats
            </div>
          ) : (
            finalData.map((item) => <ChatCard key={item._id} item={item} />)
          )}
        </div>
      </div>
      <Personalchatconatiner />
    </div>
  );
};

export default Chatlist;
