import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { isPicture } from "../utils/helpers";

import Title from "./ui/Title";
import {
  HiCamera,
  HiPencilSquare,
  HiTrash,
  HiUserCircle,
} from "react-icons/hi2";
import Button from "./ui/Button";
import Modal from "./Modal";
import DropDownMenu from "./DropdownMenu";
import ProfileNameForm from "./ProfileNameForm";
import EditProfilePictureForm from "./EditProfilePictureForm";
import DeleteProfilePictureForm from "./DeleteProfilePictureFrom";

function Profile() {
  const { user } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    {
      title: "Edit Picture",
      label: "Edit Picture",
      icon: HiPencilSquare,
      onClick: () => setIsEditModalOpen(true),
    },
    {
      title: "Remove Picture",
      label: "Remove Picture",
      icon: HiTrash,
      onClick: () => setIsDeleteModalOpen(true),
    },
  ];

  return (
    <div>
      <div className="px-2 py-2 lg:px-4 lg:py-4">
        <Title title="Profile" />
      </div>
      <div className="bg-secondary/40 grid place-items-center py-8">
        <div className="group/profilePic relative h-52 max-h-52 w-52 max-w-52 cursor-pointer rounded-full">
          {isPicture(user?.profilePicture) ? (
            <img
              src={user?.profilePicture}
              alt="Profile Picture"
              className="rounded-full object-top"
            />
          ) : (
            <HiUserCircle className="fill-muted-foreground block h-52 w-52" />
          )}
          <Button
            title="open menu"
            type="button"
            variant="icon"
            className="bg-border/90 text-background dark:text-foreground absolute top-0 left-0 z-20 hidden min-h-52 min-w-52 flex-col gap-2 rounded-full font-bold group-hover/profilePic:flex"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <HiCamera className="h-12 w-12" />
            <span className="max-w-40">Change Profile Picture</span>
          </Button>
          <DropDownMenu
            items={menuItems}
            isOpen={isMenuOpen}
            setIsOpen={setIsMenuOpen}
            position="top-[70%] -right-20"
          />
          <Modal
            title="Edit Profile Picture"
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
          >
            {user && (
              <EditProfilePictureForm
                user={user}
                setIsEditModalOpen={setIsEditModalOpen}
              />
            )}
          </Modal>
          <Modal
            title="Remove Profile Picture"
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
          >
            {user && (
              <DeleteProfilePictureForm
                user={user}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
              />
            )}
          </Modal>
        </div>
      </div>

      {user && <ProfileNameForm user={user} />}
    </div>
  );
}

export default Profile;
