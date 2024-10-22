import { model, PopulatedDoc, Schema, Types } from "mongoose";
// import { IStore } from "./store.model";

export interface IUser extends Document {
  documentNumber: string;
  name: string;
  email: string;
  password: string;
  phone: number;
  city: string;
  address: string;
  role: string;
  // dateBirth:Date;
  // store: PopulatedDoc<IStore & Document>[]
}

const UserSchema: Schema = new Schema({
  documentNumber: {
    type: String,
    unique: true,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
  },
  city: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    require: true,
    default: "ROLE_USER",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const UserModel = model<IUser>("User", UserSchema);
