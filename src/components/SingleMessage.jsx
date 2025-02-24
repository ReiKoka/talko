import { useAuth } from "../hooks/useAuth";
import { format } from "date-fns";
import Modal from "./Modal";

import EditMessageForm from "./EditMessageForm";
import DeleteMessageForm from "./DeleteMessageForm";
import { useMessageActions } from "../hooks/useMessageActions";
import { useState } from "react";
import DropDownMenu from "./DropdownMenu";
import { HiChevronDown, HiPencilSquare, HiTrash } from "react-icons/hi2";
import Button from "./ui/Button";

function SingleMessage({ message }) {
  const { user } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { handleEditSubmit, handleDeleteSubmit } = useMessageActions();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isLoggedUser = user?.id === message?.senderId;

  const menuItems = [
    {
      title: "Edit Message",
      label: "Edit Message",
      icon: HiPencilSquare,
      onClick: () => setIsEditModalOpen(true),
    },
    {
      title: "Delete Message",
      label: "Delete Message",
      icon: HiTrash,
      onClick: () => setIsDeleteModalOpen(true),
    },
  ];

  return (
    <div
      className={`flex w-fit max-w-[600px] ${isLoggedUser ? "dark:bg-primary mr-4 ml-auto bg-purple-300" : "bg-muted dark:bg-muted mr-auto ml-4"} text-foreground rounded-md px-4 py-2`}
    >
      <div className="font-primary relative flex items-end gap-4 break-words break-all">
        <span>{message.content}</span>
        <span className="min-w-fit text-xs">
          {format(message.timestamp, "hh:mm aa")}
        </span>
        {isLoggedUser && (
          <>
            <Button
              title="open menu"
              type="button"
              variant="icon"
              className={`p-0 ${isMenuOpen ? "rotate-180" : "rotate-0"}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <HiChevronDown strokeWidth={1.5} />
            </Button>
            <DropDownMenu
              items={menuItems}
              isOpen={isMenuOpen}
              setIsOpen={setIsMenuOpen}
            />

            <Modal
              title="Edit Message"
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
            >
              <EditMessageForm
                initialContent={message.content}
                onSubmit={(e, text) => {
                  e.preventDefault();
                  handleEditSubmit(message.id, text, () =>
                    setIsEditModalOpen(false),
                  );
                }}
              />
            </Modal>

            <Modal
              title="Delete Message"
              isOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
            >
              <DeleteMessageForm
                onSubmit={(e) => {
                  e.preventDefault();
                  handleDeleteSubmit(message.id, () =>
                    setIsDeleteModalOpen(false),
                  );
                }}
                onCancel={() => setIsDeleteModalOpen(false)}
              />
            </Modal>
          </>
        )}
      </div>
    </div>
  );
}

export default SingleMessage;
