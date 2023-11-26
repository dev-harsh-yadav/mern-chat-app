import React from "react";
import { useSelector } from "react-redux";
import Chatheader from "./Chatheader";
import Chatlist from "./Chatlist";
import Personalchatconatiner from "./Personalchatconatiner";

const Chatpage = () => {
  const user = useSelector((Store) => Store.User.currrentuser  );
  // console.log(user)
  return (
    <div className="mx-auto bg-authbg bg-cover bg-center text-white bg-no-repeat min-h-screen">
      <div className="flex justify-between mt-1">
        <Chatlist />
        <Personalchatconatiner />
      </div>
      <Chatheader user={user} />
    </div>
  );
};

export default Chatpage;
