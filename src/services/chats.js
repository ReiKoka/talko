import axios from "axios";
import { URL } from "./../utils/constants";

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

export const createNewChat = async (obj) => {
  try {
    const response = await axios.post(`${URL}/chats`, obj);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
