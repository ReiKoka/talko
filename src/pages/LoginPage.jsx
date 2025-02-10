import { HiEnvelope, HiLockClosed, HiMiniTrash } from "react-icons/hi2";
import Input from "../components/ui/Input";
import { useState } from "react";
import Button from "../components/ui/Button";
import { Link, useNavigate } from "react-router";
import { login } from "../services/users";
import { useAuth } from "../context/AuthContext";
import { showToast } from "../utils/toast";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) showToast("error", "Fields are empty");
    const user = { email, password };
    const data = await login(user);
    console.log(data);
    setToken(data.accessToken);
    navigate("/");
    showToast("success", `Login successful!`);
  };

  return (
    <div className="bg-muted font-primary flex h-dvh w-full items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-background text-foreground shadow-custom flex w-[90%] max-w-[500px] flex-col gap-8 rounded-xl p-4"
      >
        <h1 className="text-center text-2xl font-bold tracking-wide">Login</h1>
        <div className="flex flex-col gap-4">
          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="example@domain.com"
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
        <Link
          to="/register"
          className="text-foreground hover:text-primary mx-auto my-0 w-fit text-sm hover:underline hover:underline-offset-2"
        >
          Don`t have an account? Register here
        </Link>
        <div className="flex flex-col items-center justify-end gap-4 sm:flex-row">
          <Button type="reset" variant="secondary">
            <HiMiniTrash />
            <span>Reset</span>
          </Button>
          <Button type="submit" variant="primary">
            <HiMiniTrash />
            <span>Sign In</span>
          </Button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
