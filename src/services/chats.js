import axios from "axios";
import { URL } from "./../utils/constants";
import { getUser } from "./users";

export const getChatsForUser = async (userId) => {
  try {
    if (!userId) throw new Error(`User Id is required`);
    const response = await axios.get(
      `${URL}/chats?participants_like=${userId}`,
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const findExistingChat = async (userId, contactId) => {
  try {
    const chats = await getChatsForUser(userId);
    const existingChat = chats.find(
      (chat) =>
        chat.participants.includes(userId) &&
        chat.participants.includes(contactId),
    );

    if (!existingChat) return null;

    const otherParticipantId = existingChat.participants.find(
      (id) => id !== userId,
    );
    const otherParticipant = await getUser(otherParticipantId);

    return { ...existingChat, otherParticipant };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createNewChat = async (obj) => {
  try {
    const response = await axios.post(`${URL}/chats`, obj);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateChat = async (chat, chatId) => {
  try {
    const response = await axios.put(`${URL}/chats/${chatId}`, chat);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
