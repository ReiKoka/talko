import { useState } from "react";
import { ChatContext } from "../hooks/useChats";

export const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();

  console.log(selectedChat);

  return (
    <ChatContext.Provider value={{ selectedChat, setSelectedChat }}>
      {children}
    </ChatContext.Provider>
  );
};
