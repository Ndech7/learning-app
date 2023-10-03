import { ObjectId } from "mongodb";

export default interface IHubData {
  _id?: ObjectId;
  title: string;
  description: string;
  completed?: boolean;
}
