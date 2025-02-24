import { useEffect, useRef } from "react";
import Button from "./ui/Button";

function DropDownMenu({ items, isOpen, setIsOpen, position = "top-[100%] right-0" }) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  if (!isOpen) return null;
  
  return (
    <div
      ref={menuRef}
      className={`font-primary bg-background absolute flex w-44 min-w-fit flex-col rounded-lg p-2 transition-all duration-500 ${position} visible translate-y-0 opacity-100 z-50`}
    >
      {items.map((item, index) => (
        <Button
          key={index}
          title={item.title}
          className="hover:bg-primary group text-foreground hover:text-primary-foreground flex w-fit min-w-full items-center justify-start gap-4 rounded-md p-2"
          onClick={() => {
            item.onClick();
            setIsOpen(false); 
          }}
        >
          {item.icon && <item.icon className="fill-foreground group-hover:fill-primary-foreground h-5 w-5" />}
          <span>{item.label}</span>
        </Button>
      ))}
    </div>
  );
}

export default DropDownMenu;