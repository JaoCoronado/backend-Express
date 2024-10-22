import { model, PopulatedDoc, Schema, Types } from "mongoose";

export interface IVehicle {
  userId: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
}


const VehicleSchema = new Schema({
  userId: { type: String, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  licensePlate: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  
});

export const VehicleModel = model<IVehicle>("Vehicle", VehicleSchema);