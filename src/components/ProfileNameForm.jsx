import { useState } from "react";
import Input from "./ui/Input";
import { editUser } from "../services/users";
import { showToast } from "../utils/toast";
import { useAuth } from "../hooks/useAuth";
import Button from "./ui/Button";
import { HiCheck } from "react-icons/hi2";

function ProfileNameForm({ user }) {
  const [fullName, setFullName] = useState(user?.fullName || "");
  const { setUser } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = { ...user, fullName };
    editUser(newData);
    showToast("success", "Name changed successfully!");
    setUser(newData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-4 p-2 lg:p-4"
    >
      <div className="flex gap-4">
        <Input
          id="fullName"
          label="Your name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="border-border rounded-none border-0 border-b px-1 focus-visible:border-b-2 focus-visible:ring-0"
          autocomplete="off"
        />
        <Button
          title="edit-name"
          type="submit"
          variant="icon"
          className="group h-fit self-end"
        >
          <HiCheck
            className="stroke-foreground group-hover:stroke-primary fill-foreground group-hover:fill-primary h-5 w-5"
            strokeWidth={1}
          />
        </Button>
      </div>
      <p className="font-primary text-muted-foreground px-4 text-center text-sm">
        This is not your ID or email address. This is how your name looks to
        other Talko accounts
      </p>
    </form>
  );
}

export default ProfileNameForm;
