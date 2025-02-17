import { HiMagnifyingGlassCircle, HiOutlinePlusCircle } from "react-icons/hi2";
import Button from "./ui/Button";
import Title from "./ui/Title";

import { useEffect, useState } from "react";
import { getChatsForUser } from "../services/chats";

import SingleChat from "./SingleChat";
import { getUser } from "../services/users";

import NoMail from "/src/assets/nomail.svg?react";
import { useAuth } from "../hooks/useAuth";
import Input from "./ui/Input";

function Chats() {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const [text, setText] = useState("");

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

  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    setText(query);
  };

  const filteredChats = chats.filter((chat) =>
    chat.otherParticipant.fullName.toLowerCase().includes(text),
  );

  return (
    <>
      <div className="px-2 py-2 lg:px-4 lg:py-4">
        <div className="flex justify-between">
          <Title title="Chats" />
          <Button variant="icon" title="New chat" className="h-8 w-8 p-0">
            <HiOutlinePlusCircle
              className="text-foreground group-hover:text-primary h-full w-full transition-all duration-300 ease-out group-hover:scale-110 group-active:scale-75"
              strokeWidth={1}
            />
          </Button>
        </div>
        <Input
          id="search"
          placeholder="Search"
          icon={<HiMagnifyingGlassCircle className="h-7 w-7" />}
          value={text}
          onChange={handleChange}
          className="border-border border-2"
          iconClassName="ps-1.5"
        />
      </div>

      <div className="flex flex-col overflow-y-auto">
        {filteredChats.length ? (
          filteredChats?.map((chat) => (
            <SingleChat key={chat?.id} chat={chat} />
          ))
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 lg:gap-10">
            <NoMail className="h-72 w-72" />
            <h3 className="text-foreground font-primary px-2 text-2xl font-bold lg:px-4">
              Welcome to the Talko 🎉🎉🎉
            </h3>
            <p className="font-primary text-foreground">
              The world’s better when we communicate—let’s start talking!
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Chats;
