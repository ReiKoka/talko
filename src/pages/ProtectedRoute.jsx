import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { getUser } from "../services/users";
import { useEffect } from "react";

function ProtectedRoute() {
  const { token, setUser } = useAuth();

  useEffect(() => {
    if (token) {
      const { sub: userId } = jwtDecode(token);

      const fetchUser = async () => {
        try {
          const user = await getUser(userId);
          console.log(user);
          setUser(user);
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      };

      fetchUser();
    }
  }, [token, setUser]);

  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
