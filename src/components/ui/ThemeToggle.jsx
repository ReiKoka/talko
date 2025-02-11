import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import { useTheme } from "../../context/ThemeContext";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme((theme) => (theme === "dark" ? "light" : "dark"));
  };

  return (
    <div
      className="group text-muted-foreground hover:text-primary relative flex cursor-pointer items-center justify-center rounded-full p-2 transition-all duration-300 ease-in-out"
      onClick={handleToggle}
    >
      <HiOutlineSun
        className={`text-muted-foreground t-0 l-0 group-hover:text-primary absolute h-6 w-6 transition-all ease-out duration-300 group-hover:scale-110 group-active:scale-75 ${theme === "dark" ? "rotate-z-[-180deg] opacity-0" : "rotate-z-0 opacity-100"}`}
      />
      <HiOutlineMoon
        className={`text-muted-foreground t-0 l-0 group-hover:text-primary absolute h-6 w-6 transition-all ease-out duration-300 group-hover:scale-110 group-active:scale-75 ${theme === "dark" ? "rotate-z-0 opacity-100" : "rotate-z-180 opacity-0"}`}
      />
    </div>
  );
}

export default ThemeToggle;
