import { useEffect, useState } from "react";
import { useChats } from "../hooks/useChats";
import Topography from "/src/assets/topography.svg?react";
import { getSingleChatMessages } from "../services/messages";
import { isPicture } from "../utils/helpers";
import { HiUser } from "react-icons/hi2";

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
    <section className="bg-secondary dark:bg-secondary hidden lg:block lg:rounded-tr-lg lg:rounded-br-lg">
      <div className="relative h-full w-full">
        <Topography className="fill-muted/40 absolute top-0 left-0 z-0 h-auto w-full" />
        {selectedChat && (
          <div>
            <div className="bg-muted isolate z-10 flex w-full items-center gap-2 p-2 lg:gap-4 lg:p-4">
              {isPicture(selectedChat.otherParticipant.profilePicture) ? (
                <img
                  src={selectedChat.otherParticipant.profilePicture}
                  alt=""
                  className="h-12 w-12 rounded-full"
                />
              ) : (
                <div className="bg-secondary relative h-12 w-12 overflow-hidden rounded-full">
                  <HiUser className="text-muted-foreground absolute top-3 left-1 h-10 w-10" />
                </div>
              )}
              <p className="text-foreground font-primary text-lg font-medium">
                {selectedChat.otherParticipant.fullName}
              </p>
            </div>

            <div>{messages.map((message) => message.content)}</div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Messages;
