import { useState } from "react";
import { MessagesContext } from "../hooks/useMessages";

export const MessagesContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessagesContext.Provider>
  );
};
