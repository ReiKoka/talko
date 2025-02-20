import { useEffect, useState } from "react";
import Topography from "/src/assets/topography.svg?react";
import { getSingleChatMessages } from "../services/messages";
import MessageHeader from "./MessageHeader";
import MessageContent from "./MessageContent";
import MessageInput from "./MessageInput";
import { useSelectedChat } from "../hooks/useSelectedChat";

function Messages() {
  const { selectedChat } = useSelectedChat();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChat) return;
      const data = await getSingleChatMessages(selectedChat.id);

      setMessages(data);
    };

    fetchMessages();
  }, [selectedChat]);

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
            <MessageContent messages={messages} setMessages={setMessages} />
            <MessageInput messages={messages} setMessages={setMessages} />
          </div>
        )}
      </div>
    </section>
  );
}

export default Messages;
