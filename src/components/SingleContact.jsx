import { HiUser } from "react-icons/hi2";
import { useChats } from "../hooks/useChats";
import { isPicture } from "../utils/helpers";
import { nanoid } from "nanoid";
import { useAuth } from "../hooks/useAuth";
import { createNewChat } from "../services/chats";

function SingleContact({ contact }) {
  const { user } = useAuth();
  const { setSelectedChat } = useChats();

  const handleContactClick = async () => {
    const id = nanoid();
    const participants = [user.id, contact.id];
    const lastMessage = {
      senderId: user.id,
      content: "",
      timestamp: new Date(),
    };
    const unreadCount = 0;
    const otherParticipant = contact;

    const obj = { id, participants, lastMessage, unreadCount };
    await createNewChat(obj);
    setSelectedChat({ ...obj, otherParticipant });
  };

  return (
    <div
      className="hover:bg-secondary/50 group grid cursor-pointer grid-cols-[50px_1fr] gap-2 px-2 py-2.5 lg:gap-4 lg:px-4"
      onClick={handleContactClick}
    >
      <div className="bg-secondary h-full max-h-[50px] w-full max-w-[50px] rounded-full">
        {isPicture(contact?.profilePicture) ? (
          <img
            src={contact?.profilePicture}
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
            {contact?.fullName}
          </p>
        </div>

        <div className="border-b-secondary/50 absolute -bottom-2.5 left-0 w-full border-b group-hover:border-b-0"></div>
      </div>
    </div>
  );
}

export default SingleContact;
