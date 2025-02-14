import { formatMessageTime } from "../utils/helpers";
import SingleMessage from "./SingleMessage";

function MessageContent({ messages }) {
  return (
    <div className="flex flex-grow flex-col gap-2 overflow-y-auto px-2 py-2 lg:py-4">
      {messages.map((message, index) => {
        const messageDate = new Date(message.timestamp);
        const formattedDate = formatMessageTime(messageDate);

        const shouldShowDate =
          index === 0 ||
          formatMessageTime(new Date(messages[index - 1].timestamp)) !==
            formattedDate;

        return (
          <div key={message.id} className="z-20 flex flex-col gap-2">
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
  );
}

export default MessageContent;
