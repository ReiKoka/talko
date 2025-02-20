import { useEffect } from "react";
import Topography from "/src/assets/topography.svg?react";
import { getSingleChatMessages } from "../services/messages";
import MessageHeader from "./MessageHeader";
import MessageContent from "./MessageContent";
import MessageInput from "./MessageInput";
import { useSelectedChat } from "../hooks/useSelectedChat";
import { useMessages } from "../hooks/useMessages";

function Messages() {
  const { selectedChat } = useSelectedChat();
  const { setMessages } = useMessages();

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChat) return;
      const data = await getSingleChatMessages(selectedChat.id);

      setMessages(data);
    };

    fetchMessages();
  }, [selectedChat, setMessages]);

  return (
    <section className="bg-secondary dark:bg-secondary relative hidden overflow-hidden lg:block lg:rounded-tr-lg lg:rounded-br-lg">
      {/* Background Layer */}
      <div className="absolute top-0 left-0 z-0 h-full w-full">
        <Topography className="text-muted/30 h-full w-full" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex h-full flex-col">
        {selectedChat && (
          <div className="flex h-full flex-col overflow-hidden">
            <MessageHeader selectedChat={selectedChat} />
            <MessageContent />
            <MessageInput />
          </div>
        )}
      </div>
    </section>
  );
}

export default Messages;
