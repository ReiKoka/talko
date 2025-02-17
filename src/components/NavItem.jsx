import { NavLink } from "react-router";
import { isPicture } from "../utils/helpers";

const NavItem = ({ to, user, icon: Icon }) => {
  return (
    <li className="group aspect-square">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `focus-visible:ring-primary dark:focus-visible:ring-offset-muted flex h-full w-full items-center justify-center rounded-full ${isPicture(user?.profilePicture) ? "p-1" : "p-2"} transition-all duration-300 ease-out group-hover:scale-110 group-active:scale-75 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none ${
            isActive || location.pathname === to
              ? `${user?.profilePicture ? "bg-primary" : "bg-primary"} bg-primary text-primary-foreground`
              : `text-muted-foreground group-hover:text-primary`
          }`
        }
      >
        {isPicture(user?.profilePicture) ? (
          <div className="aspect-square w-full rounded-full">
            <img
              src={user?.profilePicture}
              alt="user-avatar"
              className="h-full w-full rounded-full object-cover object-top"
            />
          </div>
        ) : (
          <Icon className="h-6 w-6" strokeWidth={1.5} />
        )}
      </NavLink>
    </li>
  );
};

export default NavItem;
