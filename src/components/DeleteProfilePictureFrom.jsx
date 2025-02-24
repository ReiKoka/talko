import { editUser } from "../services/users";
import { showToast } from "./../utils/toast";
import Button from "./ui/Button";
import MaleAvatar from "../assets/undraw_male.svg?react";
import { useAuth } from "../hooks/useAuth";

function DeleteProfilePictureForm({ user, setIsDeleteModalOpen }) {
  const { setUser } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = { ...user, profilePicture: "" };
    editUser(newUser);
    setUser(newUser);
    showToast("success", "Profile Picture removed");
    setIsDeleteModalOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <MaleAvatar className="mx-auto h-40 w-40" />
      <h4 className="flex flex-col text-center text-lg font-medium">
        <span>Are you sure you want to delete your profile picture?</span>
        <span>You can always add one later!</span>
      </h4>

      <div className="flex items-center justify-end gap-4">
        <Button
          title="Cancel"
          variant="secondary"
          onClick={() => setIsDeleteModalOpen(false)}
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

export default DeleteProfilePictureForm;
