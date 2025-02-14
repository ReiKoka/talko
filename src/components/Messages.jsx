import { useEffect, useState } from "react";
import { useChats } from "../hooks/useChats";
import Topography from "/src/assets/topography.svg?react";
import { getSingleChatMessages } from "../services/messages";
import { formatMessageTime } from "../utils/helpers";
import SingleMessage from "./SingleMessage";
import MessageHeader from "./MessageHeader";

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
        <Topography className="fill-muted/40 absolute top-0 left-0 z-10 h-auto w-full" />

        {selectedChat && (
          <div className="flex h-full flex-col overflow-hidden">
            <MessageHeader selectedChat={selectedChat} />

            <div className="flex flex-grow flex-col gap-2 overflow-y-auto px-2 py-2 lg:gap-4 lg:py-4">
              {messages.map((message, index) => {
                const messageDate = new Date(message.timestamp);
                const formattedDate = formatMessageTime(messageDate);

                const shouldShowDate =
                  index === 0 ||
                  formatMessageTime(new Date(messages[index - 1].timestamp)) !==
                    formattedDate;

                return (
                  <div
                    key={message.id}
                    className="z-20 flex flex-col gap-2 lg:gap-4"
                  >
                    {shouldShowDate && (
                      <div className="font-primary text-background dark:text-foreground bg-border mx-auto w-fit min-w-32 rounded-lg px-4 py-2 text-center text-base">
                        {formattedDate}
                      </div>
                    )}
                    <SingleMessage message={message} />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Messages;
