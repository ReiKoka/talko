import {
  HiArrowLeftOnRectangle,
  HiOutlineChatBubbleLeftEllipsis,
  HiOutlineUser,
} from "react-icons/hi2";

import ThemeToggle from "./ui/ThemeToggle";

import Button from "./ui/Button";
import NavItem from "./NavItem";
import { showToast } from "./../utils/toast";
import { useAuth } from "../hooks/useAuth";
import { useSelectedChat } from "../hooks/useSelectedChat";

function NavLinks() {
  const { user, setToken } = useAuth();
  const { setSelectedChat } = useSelectedChat();

  const handleLogout = () => {
    setSelectedChat("");
    setToken("");
    showToast("info", `Goodbye ${user?.fullName.split(" ").at(0)}`);
  };

  return (
    <nav className="flex h-full w-full items-center justify-between lg:flex-col">
      <ul className="flex h-full items-center gap-4 px-1 lg:flex-col">
        <NavItem to="/" icon={HiOutlineChatBubbleLeftEllipsis} activeClass="" />
      </ul>

      <div className="flex items-center gap-4 lg:flex-col lg:justify-center">
        <ThemeToggle />
        <Button
          title="Logout"
          type="button"
          variant="icon"
          onClick={handleLogout}
        >
          <HiArrowLeftOnRectangle className="text-muted-foreground group-hover:text-primary h-6 w-6 transition-all duration-300 ease-out group-hover:scale-110 group-active:scale-75" />
        </Button>
        <ul>
          <NavItem to="/profile" user={user} icon={HiOutlineUser} />
        </ul>
      </div>
    </nav>
  );
}

export default NavLinks;
