import axios from "axios";
import { URL } from "./../utils/constants";

export const getSingleChatMessages = async (chatId) => {
  try {
    if (!chatId) throw new Error(`Chat Id is required`);

    const response = await axios.get(`${URL}/messages?chatId=${chatId}`);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createMessage = async (message) => {
  if (!message) throw new Error("No message received");

  try {
    const response = await axios.post(`${URL}/messages`, message);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editMessage = async (id, content) => {
  if (!content || !id) throw new Error("No message received");

  try {
    const res = await axios.patch(`${URL}/messages/${id}`, {
      content,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteMessage = async (id) => {
  if (!id) throw new Error(!`No message received`);

  try {
    const res = await axios.delete(`${URL}/messages/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
