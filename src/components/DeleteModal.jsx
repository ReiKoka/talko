import { deleteMessage } from "../services/messages";
import Modal from "./Modal";
import Button from "./ui/Button";
import UndrawThrowAway from "../assets/undraw_throw-away.svg?react";
import { useChats } from "../hooks/useChats";
import { useSelectedChat } from "../hooks/useSelectedChat";
import { useMessages } from "../hooks/useMessages";

function DeleteModal({ title, isModalOpen, setIsModalOpen, id }) {
  const { chats, setChats } = useChats();
  const { selectedChat } = useSelectedChat();
  const { messages, setMessages } = useMessages();

  const handleSubmit = (e) => {
    e.preventDefault();
    deleteMessage(id);
    setIsModalOpen(false);
    setMessages((messages) => messages.filter((message) => message.id !== id));
    
    // TO DO
    // const chat = chats.find((chat) => chat.id === selectedChat.id);
    // chat.lastMessage = messages.find(
    //   (message) => message[messages.length - 1],
    // ).content;
    // setChats((prevChats) => [...prevChats, chat]);
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
