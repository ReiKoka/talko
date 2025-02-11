import {
  HiOutlineChatBubbleLeftEllipsis,
  HiOutlineUser,
} from "react-icons/hi2";
import { NavLink, useLocation } from "react-router";

import ThemeToggle from "./ui/ThemeToggle";

function NavLinks() {
  const location = useLocation();
  

  return (
    <nav className="h-full w-full">
      <ul className="flex h-full items-center gap-4 px-2 lg:flex-col">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center justify-center rounded-full p-2 ${
                isActive || location.pathname === "/"
                  ? "text-primary bg-muted dark:bg-primary dark:text-primary-foreground transition-all duration-300 ease-in-out"
                  : "text-muted-foreground transition-all duration-300 ease-in-out"
              }`
            }
          >
            <HiOutlineChatBubbleLeftEllipsis className="h-6 w-6" />
          </NavLink>
        </li>

        <li className="ml-auto lg:mt-auto" >
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center justify-center rounded-full p-2 ${
                isActive
                  ? "text-primary bg-muted dark:bg-primary dark:text-primary-foreground transition-all duration-300 ease-in-out"
                  : "text-muted-foreground transition-all duration-300 ease-in-out"
              }`
            }
          >
            <HiOutlineUser className="h-6 w-6" />
          </NavLink>
        </li>
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </nav>
  );
}

export default NavLinks;
