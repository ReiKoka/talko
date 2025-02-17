import { useEffect, useState } from "react";
import { useChats } from "../hooks/useChats";
import Topography from "/src/assets/topography.svg?react";
import { getSingleChatMessages } from "../services/messages";
import MessageHeader from "./MessageHeader";
import MessageContent from "./MessageContent";
import MessageInput from "./MessageInput";

function Messages() {
  const { selectedChat } = useChats();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChat) return;
      const data = await getSingleChatMessages(selectedChat.id);

      console.log(data);
      setMessages(data);
    };

    fetchMessages();
  }, [selectedChat]);

  return (
    <section className="bg-secondary dark:bg-secondary hidden overflow-hidden lg:block lg:rounded-tr-lg lg:rounded-br-lg">
      <div className="relative h-full w-full overflow-hidden">
        <Topography className="text-muted/40 absolute top-0 left-0 w-full overflow-clip " />

        {selectedChat && (
          <div className="flex h-full flex-col overflow-hidden">
            <MessageHeader selectedChat={selectedChat} />
            <MessageContent messages={messages} />
            <MessageInput messages={messages} setMessages={setMessages} />
          </div>
        )}
      </div>
    </section>
  );
}

export default Messages;
