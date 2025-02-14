import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import axios from "axios";
import { URL } from "../utils/constants";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../hooks/useAuth";

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
