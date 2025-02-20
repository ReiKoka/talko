import { useAuth } from "../hooks/useAuth";
import { format } from "date-fns";
import Button from "./ui/Button";
import { HiChevronDown } from "react-icons/hi2";
import { useState } from "react";

function SingleMessage({ message }) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const isLoggedUser = user?.id === message?.senderId;

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`flex w-fit max-w-[600px] ${isLoggedUser ? "dark:bg-primary mr-4 ml-auto bg-purple-300" : "bg-muted dark:bg-muted mr-auto ml-4"} text-foreground rounded-md px-4 py-2`}
    >
      <div className="font-primary relative flex items-end gap-4 font-medium break-words break-all">
        <span>{message.content}</span>
        <span className="min-w-fit text-xs">
          {format(message.timestamp, "hh:mm aa")}
        </span>
        <Button
          title="open menu"
          type="button"
          variant="icon"
          className="p-0"
          onClick={handleClick}
        >
          <HiChevronDown strokeWidth={1.5} />
        </Button>

        <div
          className={`font-primary bg-muted absolute top-[100%] right-0 flex w-40 min-w-fit flex-col rounded-lg p-2 transition-all duration-500 ${isOpen ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"} z-50`}
        >
          <Button className="hover:bg-primary text-foreground hover:text-primary-foreground min-w-full justify-start rounded-md p-2">
            Edit Message
          </Button>
          <Button className="hover:bg-primary text-foreground hover:text-primary-foreground min-w-full justify-start rounded-md p-2">
            Delete Message
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SingleMessage;
