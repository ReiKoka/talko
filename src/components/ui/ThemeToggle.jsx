import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import { useTheme } from "../../context/ThemeContext";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme((theme) => (theme === "dark" ? "light" : "dark"));
  };

  return (
    <div
      className="group text-muted-foreground hover:text-primary relative h-10 flex w-full cursor-pointer items-center justify-center rounded-full p-2 transition-all duration-300 ease-out"
      onClick={handleToggle}
    >
      <HiOutlineSun
        className={`text-muted-foreground t-0 l-0 group-hover:text-primary absolute h-6 w-6 transition-all duration-300 ease-out group-hover:scale-110 group-active:scale-75 ${theme === "light" ? "rotate-z-[-180deg] opacity-0" : "rotate-z-0 opacity-100"}`}
        strokeWidth={1.5}
      />
      <HiOutlineMoon
        className={`text-muted-foreground t-0 l-0 group-hover:text-primary absolute h-6 w-6 transition-all duration-300 ease-out group-hover:scale-110 group-active:scale-75 ${theme === "light" ? "rotate-z-0 opacity-100" : "rotate-z-180 opacity-0"}`}
        strokeWidth={1.3}
      />
    </div>
  );
}

export default ThemeToggle;
