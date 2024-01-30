import axios from "axios";
import { Person } from "../types/person";
import { ObjectId } from "mongodb";

export const getPeople = async () => {
  const response = await axios.get("http://localhost:3002/api/people");
  return response.data as Person[];
};

export const addPerson = async (person: Person) => {
  const response = await axios.post("http://localhost:3002/api/person", person);

  if (response.status !== 200) {
    throw new Error(`Error adding person: ${response.statusText}`);
  }
};

export const deletePerson = async (id: ObjectId) => {
  const response = await axios.delete(
    `http://localhost:3002/api/person?id=${id}`
  );

  if (response.status !== 200) {
    throw new Error(`Error deleting person: ${response.statusText}`);
  }
};
