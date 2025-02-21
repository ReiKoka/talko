import { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { isPicture } from "../utils/helpers";
import Input from "./ui/Input";
import Title from "./ui/Title";
import { HiCamera, HiUserCircle } from "react-icons/hi2";
import Button from "./ui/Button";

function Profile() {
  const { user } = useAuth();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const [fullName, setFullName] = useState(() => (user ? user?.fullName : ""));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submit");
  };

  useEffect(() => {
    if (user?.fullName) {
      setFullName(user.fullName);
    }
  }, [user]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="px-2 py-2 lg:px-4 lg:py-4">
        <Title title="Profile" />
      </div>
      <div className="bg-secondary/40 grid place-items-center py-8">
        <div className="group relative h-52 max-h-52 w-52 max-w-52 cursor-pointer overflow-hidden rounded-full">
          {isPicture(user?.profilePicture) ? (
            <img
              src={`${isPicture(user?.profilePicture) && user?.profilePicture} `}
              alt="Profile Picture"
              className="object-top"
            />
          ) : (
            <HiUserCircle className="fill-muted-foreground block h-52 w-52" />
          )}
          <Button
            ref={buttonRef}
            title="open menu"
            type="button"
            variant="icon"
            className="bg-border/80 text-background dark:text-foreground absolute top-0 left-0 z-20 hidden min-h-52 min-w-52 flex-col gap-2 rounded-full font-bold uppercase group-hover:flex"
            onClick={handleClick}
          >
            <HiCamera className="w-12 h-12" />
            <span className="max-w-40">Change Profile Picture</span>
          </Button>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-4 p-2 lg:p-4"
      >
        <Input
          id="fullName"
          label="Your name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="border-border rounded-none border-0 border-b px-1 focus-visible:border-b-2 focus-visible:ring-0"
          autocomplete="off"
        />
        <p className="font-primary text-muted-foreground px-4 text-center text-sm">
          This is not your ID or email address. This is how your name looks to
          other Talko accounts
        </p>
      </form>
    </div>
  );
}

export default Profile;
