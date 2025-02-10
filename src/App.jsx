import { Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import ProtectedRoute from "./pages/ProtectedRoute";
import AppLayout from "./pages/AppLayout";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<AppLayout />} />
        </Route>
      </Routes>
      <Toaster duration={10000} />
    </>
  );
}

export default App;
