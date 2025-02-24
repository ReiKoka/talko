import axios from "axios";
import { URL } from "../utils/constants";

export const login = async (user) => {
  if (!user) throw new Error("User credentials are required");

  try {
    const res = await axios.post(`${URL}/login`, user);

    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const register = async (user) => {
  if (!user) return;

  try {
    const res = await axios.post(`${URL}/register`, user);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUser = async (id) => {
  if (!id) return;

  try {
    const res = await axios.get(`${URL}/users/${id}`);

    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllUsers = async (id) => {
  try {
    const res = await axios.get(`${URL}/users`);
    const data = res.data.filter((user) => user.id !== id);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editUser = async (user) => {
  if (!user || !user.id) return;
  try {
    const payload = {
      ...(user.fullName && { fullName: user.fullName }),
      ...(user.profilePicture && { profilePicture: user.profilePicture })
    };
    const res = await axios.patch(`${URL}/users/${user.id}`, payload);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

