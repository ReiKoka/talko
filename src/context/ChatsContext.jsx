import { useState } from "react";
import { ChatsContext } from "../hooks/useChats";

export const ChatsProvider = ({ children }) => {
  const [chats, setChats] = useState([]);

  return (
    <ChatsContext.Provider value={{ chats, setChats }}>
      {children}
    </ChatsContext.Provider>
  );
};
