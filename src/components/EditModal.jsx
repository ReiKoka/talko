import { useState } from "react";
import Modal from "./Modal";
import Textarea from "./ui/Textarea";
import { editMessage } from "../services/messages";
import { useMessages } from "../hooks/useMessages";
import { useChats } from "../hooks/useChats";
import { useSelectedChat } from "../hooks/useSelectedChat";
import { updateChat } from "../services/chats";

function EditModal({ title, isModalOpen, setIsModalOpen, id, content }) {
  const [text, setText] = useState(content);
  const { setMessages } = useMessages();
  const { setChats } = useChats();
  const { selectedChat, setSelectedChat } = useSelectedChat();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return;

    editMessage(id, text);
    setIsModalOpen(false);

    setMessages((prevMessages) => {
      const updatedMessages = prevMessages.map((message) =>
        message.id === id ? { ...message, content: text } : message,
      );

      if (selectedChat && updatedMessages.length > 0) {
        const lastMessageIndex = updatedMessages.length - 1;
        const isLastMessage = updatedMessages[lastMessageIndex].id === id;

        if (isLastMessage) {
          const lastMessage = {
            senderId: updatedMessages[lastMessageIndex].senderId,
            content: text, // Using the new edited text
            timestamp: updatedMessages[lastMessageIndex].timestamp,
          };

          (async () => {
            try {
              // eslint-disable-next-line no-unused-vars
              const { otherParticipant, ...chatWithoutOtherParticipant } =
                selectedChat;
              const updatedChat = {
                ...chatWithoutOtherParticipant,
                lastMessage,
              };

              await updateChat(updatedChat, selectedChat.id);

              setSelectedChat((prevChat) => ({
                ...prevChat,
                lastMessage,
              }));

              setChats((prevChats) =>
                prevChats.map((chat) =>
                  chat.id === selectedChat.id ? { ...chat, lastMessage } : chat,
                ),
              );
            } catch (error) {
              console.error("Error updating chat:", error);
            }
          })();
        }
      }

      return updatedMessages;
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Modal
      title={title}
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Textarea
          id="message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </form>
    </Modal>
  );
}

export default EditModal;
