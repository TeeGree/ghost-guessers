import axios from "axios";
import { Person } from "../types/person";

export const getPeople = async () => {
  const response = await axios.get(`http://localhost:3002/api/people`);
  return response.data as Person[];
};
