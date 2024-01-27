import { ObjectId } from "mongodb";

export interface Person {
  _id?: ObjectId | undefined;
  name: string;
  birthDate: string;
}
