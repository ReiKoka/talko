import { createContext, useContext } from "react";

export const ChatContext = createContext();

export const useChats = () => {
  const context = useContext(ChatContext);

  if (!context) throw new Error(`useChats must be used within an ChatProvider`);

  return context;
};
