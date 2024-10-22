import { Request, Response } from "express";
import { CustomerModel } from "../models/customer.model";

// Get All Customers
export const getCusmoters = async (req: Request, res: Response) => {
  try {
  const getAllCustomer = await CustomerModel.find({})

  res.json({ ok: true, customers: getAllCustomer });
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Error occurred", error });
  }
}

// export const getCustomersByDocumentoNumber = async (req: Request, res: Response) => {
//   const documentNumber = req.params.document;

//   try {
//     const getCustomerByDocumentNumber = await CustomerModel.findOne({ documentNumber });

//     res.json({ ok: true, user: getCustomerByDocumentNumber });
//   } catch (error) {
//     res.status(500).json({ ok: false, msg: "Error occurred", error });
//   }
// };

// Get customer by Id
export const getCustomerById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const getCustomerById = await CustomerModel.findById(id);
    res.json({ ok: true, user: getCustomerById });
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Error occurred", error });
  }
};

// Update customer
export const updateCustomerById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;

  try {
    const updateCustomerById = await CustomerModel.findByIdAndUpdate(id, payload, {
      new: true,
    });

    if (updateCustomerById) {
      res.json({ ok: true, user: updateCustomerById });
    } else {
      res.status(500).json({ ok: false, msg: "Error occurred to update user" });
    }
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Error occurred", error });
  }
};

// Delete customer by Id
export const deleteCustomerById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const deleteCustomer = await CustomerModel.findByIdAndDelete(id);
    if (deleteCustomer) {
      res.json({ ok: true, msg: "Customer deleted" });
    } else {
      res.status(500).json({ ok: false, msg: "Error occurred to delete customer" });
    }
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Error occurred", error });
  }
};

// Create customer 
export const createCustomers = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const newUser = new CustomerModel({
      ...body,
    });

    const saveUser = await newUser.save();

    res.status(201).json({
      ok: true,
      msg: "customer Created",
      user: saveUser,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error occurred",
      error,
    });
  }
};