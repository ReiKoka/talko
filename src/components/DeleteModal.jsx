import { deleteMessage } from "../services/messages";
import Modal from "./Modal";
import Button from "./ui/Button";
import UndrawThrowAway from "../assets/undraw_throw-away.svg?react";

function DeleteModal({ title, isModalOpen, setIsModalOpen, id, setMessages }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    deleteMessage(id);
    setIsModalOpen(false);
    setMessages((messages) => messages.filter((message) => message.id !== id));
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
