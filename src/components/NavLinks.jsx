import {
  HiOutlineChatBubbleLeftEllipsis,
  HiOutlineUser,
} from "react-icons/hi2";
import { NavLink, useLocation } from "react-router";

import ThemeToggle from "./ui/ThemeToggle";
import { useAuth } from "../context/AuthContext";

function NavLinks() {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <nav className="flex h-full w-full items-center justify-between lg:flex-col">
      <ul className="flex h-full items-center gap-4 px-1 lg:flex-col">
        <li className="aspect-square">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `focus-visible:ring-primary flex h-full w-full items-center justify-center rounded-full p-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-75 ${
                isActive || location.pathname === "/"
                  ? "bg-primary text-primary-foreground focus:ring-primary transition-all duration-300 ease-in-out"
                  : "text-muted-foreground transition-all duration-300 ease-in-out"
              }`
            }
          >
            <HiOutlineChatBubbleLeftEllipsis className="h-6 w-6" strokeWidth={2} />
          </NavLink>
        </li>
      </ul>

      <div className="flex items-center gap-4 lg:flex-col lg:justify-center">
        <ThemeToggle />
        <ul>
          <li className="aspect-square">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `focus-visible:ring-primary flex h-full w-full items-center justify-center rounded-full ${user?.profilePicture ? "p-1" : "p-2"} focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-75 ${
                  isActive
                    ? `${user?.profilePicture ? "bg-primary" : "bg-primary"} text-primary-foreground focus:ring-primary transition-all duration-300 ease-in-out`
                    : `text-muted-foreground transition-all duration-300 ease-in-out`
                }`
              }
            >
              {user?.profilePicture ? (
                <div className="aspect-square w-full rounded-full">
                  <img
                    src={user?.profilePicture}
                    alt="user-avatar"
                    className="h-full w-full rounded-full object-cover object-top"
                  />
                </div>
              ) : (
                <HiOutlineUser className="h-6 w-6" strokeWidth={2}/>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavLinks;
