import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import axios from "axios";
import { URL } from "../utils/constants";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("token", "");
  const [user, setUser] = useState();

  useEffect(() => {
    async () => {
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const res = await axios.get(`${URL}/users/${decoded.sub}`);

          if (!res.ok) throw new Error(`Failed to fetch user`);

          const fetchedUser = await res.json();
          setUser(fetchedUser);
        } catch (error) {
          console.error("Error fetching user:", error);
          setToken("");
          setUser(null);
        }
      }
    };
  }, [token, setToken]);

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error(`useAuth must be used within an AuthProvider`);

  return context;
};
