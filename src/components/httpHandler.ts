import axios from "axios";

export const httpHandler = async (url: string) => {
  const response = await axios.get(`http://localhost:3002${url}`);
  return response.data as string;
};
