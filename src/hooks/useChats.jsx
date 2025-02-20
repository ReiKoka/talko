import { createContext, useContext } from "react";

export const ChatsContext = createContext();

export const useChats = () => {
  const context = useContext(ChatsContext);

  if (!context) throw new Error(`useChats must be used within a ChatsProvider`);

  return context;
};
