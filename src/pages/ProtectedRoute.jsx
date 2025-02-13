import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { getUser } from "../services/users";
import { useEffect } from "react";

function ProtectedRoute() {
  const { token, setUser, setToken } = useAuth();

  useEffect(() => {
    if (token) {
      const { sub: userId, exp } = jwtDecode(token);

      const isTokenExpired = exp * 1000 < Date.now();

      if (isTokenExpired) {
        setToken("");
      } else {
        const fetchUser = async () => {
          try {
            const user = await getUser(userId);

            setUser(user);
          } catch (error) {
            console.error("Failed to fetch user:", error);
          }
        };
        fetchUser();
      }
    }
  }, [token, setUser, setToken]);

  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
