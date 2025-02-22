import { useAuth } from "../hooks/useAuth";
import { format } from "date-fns";
import Button from "./ui/Button";
import { HiChevronDown, HiPencilSquare, HiTrash } from "react-icons/hi2";
import { useEffect, useRef, useState } from "react";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

function SingleMessage({ message }) {
  const { user } = useAuth();

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const isLoggedUser = user?.id === message?.senderId;

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickDelete = () => {
    setIsDeleteModalOpen(true);
    setIsOpen(false);
  };

  const handleClickEdit = () => {
    setIsEditModalOpen(true);
    setIsOpen(false);
  };

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
              ref={buttonRef}
              title="open menu"
              type="button"
              variant="icon"
              className={`p-0 ${isOpen ? "rotate-180" : "rotate-0"}`}
              onClick={handleClick}
            >
              <HiChevronDown strokeWidth={1.5} />
            </Button>

            <div
              ref={menuRef}
              className={`font-primary bg-background absolute top-[100%] right-0 flex w-44 min-w-fit flex-col rounded-lg p-2 transition-all duration-500 ${isOpen ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"} z-50`}
            >
              <Button
                title="Edit Message"
                className="hover:bg-primary group text-foreground hover:text-primary-foreground flex w-fit min-w-full items-center justify-start gap-4 rounded-md p-2"
                onClick={handleClickEdit}
              >
                <HiPencilSquare className="fill-foreground group-hover:fill-primary-foreground h-5 w-5" />
                <span>Edit Message</span>
              </Button>

              <Button
                title="Delete Message"
                onClick={handleClickDelete}
                className="hover:bg-primary group text-foreground hover:text-primary-foreground flex min-w-full items-center justify-start gap-4 rounded-md p-2"
              >
                <HiTrash className="fill-foreground group-hover:fill-primary-foreground h-5 w-5" />
                <span>Delete Message</span>
              </Button>
              <DeleteModal
                title="Delete Message"
                isModalOpen={isDeleteModalOpen}
                setIsModalOpen={setIsDeleteModalOpen}
                id={message.id}
              />
              <EditModal
                title="Edit Modal"
                isModalOpen={isEditModalOpen}
                setIsModalOpen={setIsEditModalOpen}
                id={message.id}
                content={message.content}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SingleMessage;
