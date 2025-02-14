import { useState } from "react";
import Textarea from "./ui/Textarea";
import { useAuth } from "../hooks/useAuth";
import { useChats } from "../hooks/useChats";
import { createMessage } from "../services/messages";
import { showToast } from "../utils/toast";

function MessageInput({ messages, setMessages }) {
  const [text, setText] = useState("");
  const { user } = useAuth();
  const { selectedChat } = useChats();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) return;

    const senderId = user?.id;
    const chatId = selectedChat.id;
    const timestamp = new Date();

    const message = {
      chatId,
      senderId,
      content: text,
      timestamp,
      status: "delivered",
    };

    await createMessage(message);
    showToast("success", `Message sent!`);
    setText("");
    setMessages([...messages, message]);
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
      />
    </form>
  );
}

export default MessageInput;
