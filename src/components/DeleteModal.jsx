import { deleteMessage } from "../services/messages";
import Modal from "./Modal";
import Button from "./ui/Button";
import UndrawThrowAway from "../assets/undraw_throw-away.svg?react";
import { useChats } from "../hooks/useChats";
import { useSelectedChat } from "../hooks/useSelectedChat";
import { useMessages } from "../hooks/useMessages";
import { updateChat } from "../services/chats";

function DeleteModal({ title, isModalOpen, setIsModalOpen, id }) {
  const { setChats } = useChats();
  const { selectedChat, setSelectedChat } = useSelectedChat();
  const { setMessages } = useMessages();

  const handleSubmit = async (e) => {
    e.preventDefault();
    deleteMessage(id);
    setIsModalOpen(false);

    setMessages((prevMessages) => {
      const updatedMessages = prevMessages.filter(
        (message) => message.id !== id,
      );

      if (selectedChat && updatedMessages.length > 0) {
        const lastMessage = {
          senderId: updatedMessages[updatedMessages.length - 1].senderId,
          content: updatedMessages[updatedMessages.length - 1].content,
          timestamp: updatedMessages[updatedMessages.length - 1].timestamp,
        };

        // eslint-disable-next-line no-unused-vars
        const { otherParticipant, ...chatWithoutOtherParticipant } =
          selectedChat;
        const updatedChat = { ...chatWithoutOtherParticipant, lastMessage };

        (async () => {
          try {
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

      return updatedMessages;
    });
  };

  return (
    <Modal
      title={title}
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <UndrawThrowAway className="mx-auto h-40 w-40" />
        <h4 className="flex flex-col text-center text-lg font-medium">
          <span>Are you sure you want to unsent this message?</span>
          <span>This action cannot be undone?</span>
        </h4>
        <div className="flex items-center justify-end gap-4">
          <Button
            variant="secondary"
            type="reset"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Delete
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default DeleteModal;
