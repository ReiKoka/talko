import { createContext, useContext } from "react";

export const SelectedChatContext = createContext();

export const useSelectedChat = () => {
  const context = useContext(SelectedChatContext);

  if (!context)
    throw new Error(`useSelectedChat must be used within a SelectedChatProvider`);

  return context;
};
