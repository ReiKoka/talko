import {
  HiOutlineChatBubbleLeftEllipsis,
  HiOutlineUser,
} from "react-icons/hi2";
import { NavLink, useLocation } from "react-router";

import ThemeToggle from "./ui/ThemeToggle";

function NavLinks() {
  const location = useLocation();

  return (
    <nav className="flex h-full w-full items-center justify-between lg:flex-col">
      <ul className="flex h-full items-center gap-4 px-1 lg:flex-col">
        <li className="aspect-square">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `focus-visible:ring-primary flex h-full w-full items-center justify-center rounded-full p-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none ${
                isActive || location.pathname === "/"
                  ? "bg-primary text-primary-foreground focus:ring-primary transition-all duration-300 ease-in-out"
                  : "text-muted-foreground transition-all duration-300 ease-in-out"
              }`
            }
          >
            <HiOutlineChatBubbleLeftEllipsis className="h-6 w-6" />
          </NavLink>
        </li>
      </ul>

      <div className="flex gap-4 items-center lg:flex-col lg:justify-center">
        <ThemeToggle />
        <ul>
          <li className="aspect-square">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `focus-visible:ring-primary flex h-full w-full items-center justify-center rounded-full p-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none ${
                  isActive
                    ? "bg-primary text-primary-foreground focus:ring-primary transition-all duration-300 ease-in-out"
                    : "text-muted-foreground transition-all duration-300 ease-in-out"
                }`
              }
            >
              <HiOutlineUser className="h-6 w-6" />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavLinks;
