import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { isPicture } from "../utils/helpers";
import Input from "./ui/Input";
import Title from "./ui/Title";

function Profile() {
  const { user } = useAuth();

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

  return (
    <div>
      <div className="px-2 py-4">
        <Title title="Profile" />
      </div>
      <div className="bg-secondary/40 grid place-items-center py-8">
        <div className="max-h-52 max-w-52 overflow-hidden rounded-full">
          <img
            src={`${isPicture(user?.profilePicture) && user?.profilePicture} `}
            alt="Profile Picture"
            className="object-top"
          />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="w-full p-2 lg:p-4 flex flex-col gap-4">
        <Input
          id="fullName"
          label="Your name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="border-border rounded-none border-0 border-b-2 focus-visible:ring-0"
        />
        <p className="font-primary px-4 text-center text-sm text-muted-foreground">
          This is not your ID or email address. This is how your name looks to
          other Talko accounts
        </p>
      </form>
    </div>
  );
}

export default Profile;
