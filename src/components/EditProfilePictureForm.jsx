import { useState } from "react";
import Input from "./ui/Input";
import { editUser } from "../services/users";
import { showToast } from "./../utils/toast";
import Button from "./ui/Button";
import EditAvatar from "../assets/edit-avatar.svg?react";
import { useAuth } from "../hooks/useAuth";

function EditProfilePictureForm({ user, setIsEditModalOpen }) {
  const [imageUrl, setImageUrl] = useState(user?.profilePicture);
  const { setUser } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (typeof imageUrl !== "string") return;

    const newUser = { ...user, profilePicture: imageUrl };
    editUser(newUser);
    setUser(newUser);

    showToast("success", "Profile Picture updated");
    setIsEditModalOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <EditAvatar className="mx-auto h-40 w-40" />
      <Input
        id={user?.id}
        label="Avatar"
        placeholder="Enter Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <div className="flex items-center justify-end gap-4">
        <Button
          title="Cancel"
          variant="secondary"
          onClick={() => setIsEditModalOpen(false)}
        >
          Cancel
        </Button>
        <Button title="Confirm" variant="primary" type="submit">
          Confirm
        </Button>
      </div>
    </form>
  );
}

export default EditProfilePictureForm;
