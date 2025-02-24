import { useMessages } from "../hooks/useMessages";
import { useChats } from "../hooks/useChats";
import { useSelectedChat } from "../hooks/useSelectedChat";
import { editMessage, deleteMessage } from "../services/messages";
import { updateChat } from "../services/chats";

export function useMessageActions() {
  const { setMessages } = useMessages();
  const { setChats } = useChats();
  const { selectedChat, setSelectedChat } = useSelectedChat();

  const handleEditSubmit = async (messageId, text, onClose) => {
    if (!text) return;
    await editMessage(messageId, text);
    onClose();

    setMessages((prevMessages) => {
      const updatedMessages = prevMessages.map((msg) =>
        msg.id === messageId ? { ...msg, content: text } : msg,
      );

      if (selectedChat && updatedMessages.length > 0) {
        const lastMessageIndex = updatedMessages.length - 1;
        const isLastMessage =
          updatedMessages[lastMessageIndex].id === messageId;

        if (isLastMessage) {
          const lastMessage = {
            senderId: updatedMessages[lastMessageIndex].senderId,
            content: text,
            timestamp: updatedMessages[lastMessageIndex].timestamp,
          };

          (async () => {
            try {
              // eslint-disable-next-line no-unused-vars
              const { otherParticipant, ...chatWithoutOtherParticipant } =
                selectedChat;
              const updatedChat = {
                ...chatWithoutOtherParticipant,
                lastMessage,
              };
              await updateChat(updatedChat, selectedChat.id);
              setSelectedChat((prevChat) => ({ ...prevChat, lastMessage }));
              setChats((prevChats) =>
                prevChats.map((chat) =>
                  chat.id === selectedChat.id ? { ...chat, lastMessage } : chat,
                ),
              );
            } catch (error) {
              console.error("Error updating chat:", error);
            }
          })();
        }
      }
      return updatedMessages;
    });
  };

  const handleDeleteSubmit = async (messageId, onClose) => {
    await deleteMessage(messageId);
    onClose();

    setMessages((prevMessages) => {
      const updatedMessages = prevMessages.filter(
        (msg) => msg.id !== messageId,
      );

      if (selectedChat && updatedMessages.length > 0) {
        const lastMessage = {
          senderId: updatedMessages[updatedMessages.length - 1].senderId,
          content: updatedMessages[updatedMessages.length - 1].content,
          timestamp: updatedMessages[updatedMessages.length - 1].timestamp,
        };

        (async () => {
          try {
            // eslint-disable-next-line no-unused-vars
            const { otherParticipant, ...chatWithoutOtherParticipant } =
              selectedChat;
            const updatedChat = { ...chatWithoutOtherParticipant, lastMessage };
            await updateChat(updatedChat, selectedChat.id);
            setSelectedChat((prevChat) => ({ ...prevChat, lastMessage }));
            setChats((prevChats) =>
              prevChats.map((chat) =>
                chat.id === selectedChat.id ? { ...chat, lastMessage } : chat,
              ),
            );
          } catch (error) {
            console.error("Error updating chat:", error);
          }
        })();
      }
      return updatedMessages;
    });
  };

  return { handleEditSubmit, handleDeleteSubmit };
}
