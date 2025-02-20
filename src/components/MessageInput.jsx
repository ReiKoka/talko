import { useState } from "react";
import Textarea from "./ui/Textarea";
import { useAuth } from "../hooks/useAuth";
import { useChats } from "../hooks/useChats";
import { createMessage } from "../services/messages";
import { nanoid } from "nanoid";
import { createNewChat, findExistingChat, updateChat } from "../services/chats";

function MessageInput({ setMessages }) {
  const [text, setText] = useState("");
  const { user } = useAuth();
  const { selectedChat } = useChats();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const existingChat = await findExistingChat(
      user.id,
      selectedChat.otherParticipant.id,
    );

    const senderId = user?.id;
    const chatId = selectedChat.id;
    const timestamp = new Date();
    const id = nanoid();

    // prettier-ignore
    const message = {chatId, senderId, content: text, timestamp, status: "delivered", id};
    const lastMessage = {
      senderId: message.senderId,
      content: message.content,
      timestamp: message.timestamp,
    };

    if (existingChat) {
      createMessage(message);
      updateChat(lastMessage, selectedChat.id);
      setMessages((prev) => [...prev, message]);
      setText("");

      return;
    }

    // eslint-disable-next-line no-unused-vars
    const { otherParticipant, ...chat } = selectedChat;
    createNewChat({ ...chat, lastMessage, unreadCount: 1 });
    createMessage(message);
    setMessages((prev) => [...prev, message]);

    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="font-primary bg-muted isolate z-30 flex w-full p-2 lg:p-4"
    >
      <Textarea
        id="message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </form>
  );
}

export default MessageInput;
