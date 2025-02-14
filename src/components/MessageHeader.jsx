import { HiUser } from "react-icons/hi2";
import { isPicture } from "../utils/helpers";

function MessageHeader({ selectedChat }) {
  return (
    <div className="bg-muted isolate z-20 flex w-full items-center gap-2 p-2 lg:gap-4 lg:p-4">
      {isPicture(selectedChat.otherParticipant.profilePicture) ? (
        <img
          src={selectedChat.otherParticipant.profilePicture}
          alt=""
          className="h-12 w-12 rounded-full"
        />
      ) : (
        <div className="bg-secondary relative h-12 w-12 overflow-hidden rounded-full">
          <HiUser className="text-muted-foreground absolute top-3 left-1 h-10 w-10" />
        </div>
      )}
      <p className="text-foreground font-primary text-lg font-medium">
        {selectedChat.otherParticipant.fullName}
      </p>
    </div>
  );
}

export default MessageHeader;
