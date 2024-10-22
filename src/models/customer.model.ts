import { Model, model, Schema } from "mongoose";


export interface ICustomer extends Document{
  documentNumber:string;
  name:string;
  email:string;
  dateBirth:Date;
  city: string;
  country:string;
  gender:string;
  phone: string;
  marital_status: string;
  ocupation: string;
  address: IAddress;
}

export interface IAddress {
  city: string;
  country:string;
  zip_code:string;
  address:string;
  neighborhood:string;
}

const CustomerSchema: Schema = new Schema({
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
  dateBirth: {
    type: Date,
  },
  city: {
    type: String,
    
  },
  country: {
    type: String,
  },
  gender: {
    type: String,
  },
  phone:{
    type: String,
  },
  marital_status: {
    type: String,
  },
  ocupation: {
    type: String,
  },
  address: {
    type: Object,
  }
});

export const CustomerModel: Model<ICustomer> = model<ICustomer>('Customer', CustomerSchema);

