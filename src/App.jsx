import { Route, Routes } from "react-router";
import { Toaster } from "sonner";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import AppLayout from "./pages/AppLayout";
import Chats from "./components/Chats";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route index element={<Chats />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
      <Toaster duration={3000} />
    </>
  );
}

export default App;
