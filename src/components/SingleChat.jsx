import { HiUser } from "react-icons/hi2";
import { formatMessageTime, isPicture } from "../utils/helpers";

import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { useAuth } from "../hooks/useAuth";
import { useSelectedChat } from "../hooks/useSelectedChat";

function SingleChat({ chat }) {
  const { user } = useAuth();
  const { setSelectedChat } = useSelectedChat();
  const isUserLastSender = user.id === chat?.lastMessage.senderId;

  return (
    <div
      className={`hover:bg-secondary/50 focus:bg-secondary/50 group grid cursor-pointer grid-cols-[50px_1fr] gap-2 px-2 py-2.5 lg:gap-4 lg:px-4`}
      onClick={() => setSelectedChat(chat)}
      tabIndex={0}
    >
      <div className="bg-secondary h-full max-h-[50px] w-full max-w-[50px] rounded-full">
        {isPicture(chat?.otherParticipant?.profilePicture) ? (
          <img
            src={chat?.otherParticipant?.profilePicture}
            alt="friend-profile-picture"
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <div className="flex aspect-square h-full w-full items-end justify-center overflow-hidden">
            <HiUser className="text-muted-foreground -mb-0.5 h-10 w-10" />
          </div>
        )}
      </div>

      <div className="relative grid grid-cols-[4fr_auto] gap-2 lg:gap-4">
        <div className="flex flex-col justify-between overflow-hidden">
          <p className="font-primary text-foreground truncate text-lg font-medium">
            {chat?.otherParticipant?.fullName}
          </p>
          <p className="font-primary text-foreground flex items-center gap-2 truncate text-base font-normal">
            {isUserLastSender && (
              <IoCheckmarkDoneSharp
                className={`${chat?.unreadCount > 0 ? "text-muted-foreground" : "text-primary dark:text-purple-500"} h-4 w-4`}
              />
            )}{" "}
            <span>{chat?.lastMessage?.content}</span>
          </p>
        </div>

        <div className="flex max-h-[50px] flex-col justify-between py-1">
          <p className="text-muted-foreground text-sm">
            {formatMessageTime(chat?.lastMessage?.timestamp)}
          </p>
        </div>

        <div className="border-b-secondary/50 absolute -bottom-2.5 left-0 w-full border-b group-hover:border-b-0"></div>
      </div>
    </div>
  );
}

export default SingleChat;
