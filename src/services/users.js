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
    const res = await axios.post(`${URL}/users/register`, user);

    if (!res.ok) throw new Error(`Login failed. Please try again`);

    const data = res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
