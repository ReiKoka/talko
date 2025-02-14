import { useAuth } from "../hooks/useAuth";

function SingleMessage({ message }) {
  const { user } = useAuth();

  const isLoggedUser = user?.id === message?.senderId;

  return (
    <div
      className={`flex w-fit ${isLoggedUser ? "dark:bg-primary mr-4 ml-auto bg-purple-300" : "bg-muted dark:bg-muted mr-auto ml-4"} text-foreground font-primary isolate z-20 rounded-md px-4 py-2 `}
    >
      {message.content}
    </div>
  );
}

export default SingleMessage;
