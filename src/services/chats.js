import axios from "axios";
import { URL } from "./../utils/constants";

export const getChatsForUser = async (userId) => {
  try {
    if (!userId) throw new Error(`User Id is required`);
    const response = axios.get(`${URL}/chats?participants_like=${userId}`);

    console.log(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
