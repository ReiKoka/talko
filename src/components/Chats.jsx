import { HiOutlinePlusCircle } from "react-icons/hi2";
import Button from "./ui/Button";
import Title from "./ui/Title";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getChatsForUser } from "../services/chats";

import SingleChat from "./SingleChat";
import { getUser } from "../services/users";

function Chats() {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchChats = async () => {
      try {
        const fetchedChats = await getChatsForUser(user.id);
        const userCache = new Map();
        const chatIds = new Set();

        const updatedChats = await Promise.all(
          fetchedChats.map(async (chat) => {
            if (chatIds.has(chat.id)) return null;

            chatIds.add(chat.id);
            const otherParticipant = chat.participants.find(
              (id) => id !== user.id,
            );

            // Check cache before making a request
            if (!userCache.has(otherParticipant)) {
              try {
                const userData = await getUser(otherParticipant);
                userCache.set(otherParticipant, userData);
              } catch (error) {
                console.error(
                  `Failed to fetch user ${otherParticipant}:`,
                  error,
                );
                userCache.set(otherParticipant, null);
              }
            }

            return {
              ...chat,
              otherParticipant: userCache.get(otherParticipant),
            };
          }),
        );

        setChats(updatedChats.filter(Boolean));
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, [user]);

  return (
    <>
      <div className="flex items-end justify-between pb-2 lg:pb-4">
        <Title title="Chats" />
        <Button variant="icon" title="New chat" className="h-8 w-8 p-0">
          <HiOutlinePlusCircle
            className="text-foreground group-hover:text-primary h-full w-full transition-all duration-300 ease-out group-hover:scale-110 group-active:scale-75"
            strokeWidth={1}
          />
        </Button>
      </div>

      <div className="flex flex-col overflow-y-auto">
        {chats?.map((chat) => (
          <SingleChat key={chat?.id} chat={chat} />
        ))}
      </div>
    </>
  );
}

export default Chats;
