import { useEffect, useRef } from "react";
import { formatMessageTime } from "../utils/helpers";
import SingleMessage from "./SingleMessage";

function MessageContent({ messages, setMessages }) {
  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-grow flex-col gap-2 overflow-x-clip overflow-y-auto px-2 py-2 lg:py-4">
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
            className="flex flex-col gap-2"
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            {shouldShowDate && (
              <div className="font-primary text-background dark:text-foreground bg-border mx-auto mt-auto w-fit min-w-32 rounded-lg px-4 py-2 text-center text-base">
                {formattedDate}
              </div>
            )}
            <SingleMessage message={message} setMessages={setMessages} />
          </div>
        );
      })}
    </div>
  );
}

export default MessageContent;
