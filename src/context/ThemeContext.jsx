import { createContext, useContext, useEffect } from "react";
import { applyTheme } from "../utils/applyTheme";
import useLocalStorage from "../hooks/useLocalStorage";

// Context Creation
const ThemeContext = createContext(null);

// Context Provider
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setThemeAndPersist = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeAndPersist }}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
