import { model, PopulatedDoc, Schema, Types } from "mongoose";
import { IUser } from "./user.model";


export interface IStore extends Document {
  name: string;
  address: string;
  phone: string;
  price: number;
  admin: Types.ObjectId;
  // admin: PopulatedDoc<IUser & Document>[]
  createdAt?: Date;
}

const StoreSchema: Schema = new Schema({
  name: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  admin: {
    type: Types.ObjectId,
    ref: "User",
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const StoreModel = model<IStore>("Store", StoreSchema);
