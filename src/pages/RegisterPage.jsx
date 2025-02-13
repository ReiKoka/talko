import {
  HiEnvelope,
  HiLink,
  HiLockClosed,
  HiMiniTrash,
  HiUser,
} from "react-icons/hi2";
import Input from "../components/ui/Input";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Button from "../components/ui/Button";
import { register } from "../services/users";
import { showToast } from "../utils/toast";

function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password)
      showToast("error", "Fields are empty");

    const obj = { fullName, email, password, avatar, status: "offline" };
    await register(obj);
    showToast("success", `New user created successfully!`);
    navigate("/login");
  };

  return (
    <div className="bg-muted font-primary flex h-dvh w-full items-end justify-center py-4 sm:items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-background text-foreground shadow-custom flex w-[90%] max-w-[500px] flex-col gap-4 rounded-xl p-4 md:gap-8"
      >
        <h1 className="text-center text-2xl font-bold tracking-wide">
          Create Account
        </h1>
        <div className="flex flex-col gap-4">
          <Input
            id="fullName"
            type="text"
            label="Name"
            placeholder="e.g. John Doe"
            icon={<HiUser />}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
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
          <Input
            id="profilePicture"
            type="text"
            label="Avatar"
            placeholder="URL to your profile pic"
            icon={<HiLink />}
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </div>
        <p className="text-foreground mx-auto my-0 flex w-fit gap-2 text-sm">
          <span>Already have an account?</span>
          <Link
            to="/login"
            className="text-primary hover:text-primary hover:underline hover:underline-offset-4"
          >
            Login here
          </Link>
        </p>
        <div className="flex flex-col items-center justify-end gap-4 sm:flex-row">
          <Button type="reset" variant="secondary">
            <HiMiniTrash />
            <span>Reset</span>
          </Button>
          <Button type="submit" variant="primary">
            <HiMiniTrash />
            <span>Create Account</span>
          </Button>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
