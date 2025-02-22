import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { SelectedChatProvider } from "./context/ChatContext.jsx";
import { ChatsProvider } from "./context/ChatsContext";
import { MessagesContextProvider } from "./context/MessagesContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ChatsProvider>
            <SelectedChatProvider>
              <MessagesContextProvider>
                <App />
              </MessagesContextProvider>
            </SelectedChatProvider>
          </ChatsProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
