import axios from "axios";
import { Person } from "../types/person";

export const getPeople = async () => {
  const response = await axios.get(`http://localhost:3002/api/people`);
  return response.data as Person[];
};

export const addPerson = async (person: Person) => {
  const response = await axios.post(
    `http://localhost:3002/api/person`,
    person,
    {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );

  if (response.status !== 200) {
    throw new Error(`Error adding person: ${response.statusText}`);
  }
};
