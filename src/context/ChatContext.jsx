import { useState } from "react";
import { SelectedChatContext } from "../hooks/useSelectedChat";

export const SelectedChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();

  return (
    <SelectedChatContext.Provider value={{ selectedChat, setSelectedChat }}>
      {children}
    </SelectedChatContext.Provider>
  );
};
