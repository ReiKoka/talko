import { createContext, useContext } from "react";

export const MessagesContext = createContext();

export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (!context)
    throw new Error(`useMessages must be used within a MessagesProvider`);

  return context;
};
