import { useEffect, useState } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi2";

import { useAuth } from "../hooks/useAuth";

import { getChatsForUser } from "../services/chats";
import { getAllUsers, getUser } from "../services/users";

import SingleChat from "./SingleChat";
import AddNewChat from "./AddNewChat";
import SearchInput from "./SearchInput";
import NoMail from "/src/assets/nomail.svg?react";

import Button from "./ui/Button";
import Title from "./ui/Title";
import { showToast } from "./../utils/toast";
import { useChats } from "../hooks/useChats";

function Chats() {
  const { user } = useAuth();
  const { chats, setChats } = useChats();
  const [text, setText] = useState("");
  const [showAddChat, setShowAddChat] = useState(false);
  const [contacts, setContacts] = useState();

  useEffect(() => {
    if (!user) return;

    const fetchChats = async () => {
      try {
        const fetchedChats = await getChatsForUser(user.id);

        const updatedChats = await Promise.all(
          fetchedChats.map(async (chat) => {
            const otherParticipant = chat.participants.find(
              (id) => id !== user.id,
            );

            try {
              const userData = await getUser(otherParticipant);
              return {
                ...chat,
                otherParticipant: userData,
              };
            } catch (error) {
              console.error(`Failed to fetch user ${otherParticipant}:`, error);
              return null;
            }
          }),
        );

        setChats(updatedChats.filter(Boolean));
      } catch (error) {
        console.error("Error fetching chats:", error);
        showToast("error", "Failed to get all chats");
      }
    };

    fetchChats();
  }, [setChats, user]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setText(query);
  };

  const filteredChats = chats.filter((chat) =>
    chat.otherParticipant.fullName.toLowerCase().includes(text),
  );

  // Open Add New Chat Section
  const openAddChat = async () => {
    setShowAddChat(true);
    if (!contacts) {
      try {
        const fetchedContacts = await getAllUsers(user.id);
        setContacts(fetchedContacts);
      } catch (error) {
        console.error(error);
        showToast("error", `Failed to get contacts`);
      }
    }
  };

  const closeAddChat = () => setShowAddChat(false);

  return (
    <>
      <div className="px-2 py-2 lg:px-4 lg:py-4">
        <div className="flex justify-between">
          <Title title="Chats" />
          <Button
            variant="icon"
            title="New chat"
            className="h-8 w-8 p-0"
            onClick={openAddChat}
          >
            <HiOutlinePlusCircle
              className="text-foreground group-hover:text-primary h-full w-full transition-all duration-500 ease-out group-hover:scale-110 group-active:scale-75"
              strokeWidth={1}
            />
          </Button>
        </div>
        <SearchInput value={text} onChange={handleSearch} />
      </div>

      <div className="flex flex-col-reverse overflow-y-auto">
        {filteredChats.length ? (
          filteredChats?.map((chat) => (
            <SingleChat key={chat?.id} chat={chat} />
          ))
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 lg:gap-10">
            <NoMail className="h-72 w-72" />
            <h3 className="text-foreground font-primary px-2 text-2xl font-bold lg:px-4">
              Welcome to Talko 🎉🎉🎉
            </h3>
            <p className="font-primary text-foreground">
              The world’s better when we communicate—let’s start talking!
            </p>
          </div>
        )}
      </div>

      <div
        className={`absolute top-0 h-full w-full transition-all duration-500 ease-out ${showAddChat ? "visible left-0" : "invisible -left-[100%]"}`}
      >
        <AddNewChat onClose={closeAddChat} contacts={contacts} />
      </div>
    </>
  );
}

export default Chats;
