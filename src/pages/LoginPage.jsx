import {
  HiEnvelope,
  HiLockClosed,
  HiMiniArrowRightOnRectangle,
  HiOutlineTrash,
} from "react-icons/hi2";
import Input from "../components/ui/Input";
import { useState } from "react";
import Button from "../components/ui/Button";
import { Link, Navigate, useNavigate } from "react-router";
import { login } from "../services/users";

import { showToast } from "../utils/toast";
import { useAuth } from "../hooks/useAuth";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { token, setToken, setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast("error", "Fields are empty");
      return; // Stop execution if fields are empty
    }

    const user = { email, password };
    try {
      const data = await login(user);

      setToken(data.accessToken);
      setUser(data.user);
      navigate("/");
      showToast(
        "success",
        `Welcome back ${data.user?.fullName.split(" ").at(0)}`,
      );
    } catch (error) {
      if (error.response) {
        const errorMsg = error.response.data.message || "Incorrect Credentials";
        showToast("error", errorMsg);
      } else if (error.request) {
        showToast("error", "Network error, please try again");
      } else {
        showToast("error", "An unexpected error occurred");
      }
      console.error("Login error:", error);
    }
  };

  if (token) return <Navigate to="/" replace />;

  return (
    <div className="bg-muted font-primary flex h-dvh w-full items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-background text-foreground shadow-custom flex w-[90%] max-w-[500px] flex-col gap-4 rounded-xl p-4 md:gap-8"
      >
        <h1 className="text-center text-2xl font-bold tracking-wide">Login</h1>
        <div className="flex flex-col gap-4">
          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="e.g. example@domain.com"
            icon={<HiEnvelope />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="Create a password between 6 and 12 characters"
            icon={<HiLockClosed />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p className="text-foreground mx-auto my-0 flex w-fit gap-2 text-sm">
          <span>Don&apos;t have an account?</span>
          <Link
            to="/register"
            className="text-primary hover:text-primary hover:underline hover:underline-offset-4"
          >
            Register here
          </Link>
        </p>
        <div className="flex flex-col items-center justify-end gap-4 sm:flex-row">
          <Button type="reset" variant="secondary">
            <HiOutlineTrash />
            <span>Reset</span>
          </Button>
          <Button type="submit" variant="primary">
            <HiMiniArrowRightOnRectangle />
            <span>Sign In</span>
          </Button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
