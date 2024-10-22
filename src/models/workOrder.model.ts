import { model, PopulatedDoc, Schema, Types } from "mongoose";
// import { IUser } from "./user.model";


export interface IWorkOrder  extends Document {
  vehicleId: string;
  description: string;
  status: 'pending' | 'completed' | 'in-progress';
  cost: number;
}

const WorkOrderSchema: Schema = new Schema({
  vehicleId: { type: String, required: true },
  description: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'completed','in-progress'],
    default: 'pending'
  },
  cost: { type: Number, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const WorkOrderModel = model<IWorkOrder >("WorkOrder", WorkOrderSchema);
