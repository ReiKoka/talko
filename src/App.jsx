import { Route, Routes } from "react-router"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ProtectedRoute from "./pages/ProtectedRoute"
import ChatPage from "./pages/ChatPage"


function App() {
  return (
   <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <ProtectedRoute path="/" element={<ChatPage />} />

   </Routes>
  )
}

export default App
