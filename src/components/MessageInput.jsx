import { useState } from "react";
import Textarea from "./ui/Textarea";
import { useAuth } from "../hooks/useAuth";
import { useChats } from "../hooks/useChats";
import { createMessage } from "../services/messages";
import { nanoid } from "nanoid";

function MessageInput({ setMessages }) {
  const [text, setText] = useState("");
  const { user } = useAuth();
  const { selectedChat } = useChats();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const senderId = user?.id;
    const chatId = selectedChat.id;
    const timestamp = new Date();
    const id = nanoid();

    const message = {
      chatId,
      senderId,
      content: text,
      timestamp,
      status: "delivered",
      id,
    };

    await createMessage(message);
    setText("");
    setMessages((prev) => [...prev, message]);
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
