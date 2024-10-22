import { Request, Response } from "express";
import { VehicleModel } from "../models/vehicle.model";

export const getVehicles = async (req: Request, res: Response) => {
    try {
      const getAllVehicles = await VehicleModel.find({});
      res.json({ ok: true, vehicles: getAllVehicles });
    } catch (error) {
      res.status(500).json({ ok: false, msg: "Error occurred", error });
    }
  }

  export const getVehicleById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const getVehicleById = await VehicleModel.findById(id);
      res.json({ ok: true, vehicle: getVehicleById });
    } catch (error) {
      res.status(500).json({ ok: false, msg: "Error occurred", error });
    }
  }

  export const createVehicle = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const newVehicle = new VehicleModel(body);
      const saveVehicle = await newVehicle.save();
      res.status(201).json({
        ok: true,
        msg: "Vehicle Created",
        vehicle: saveVehicle,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        msg: "Error occurred",
        error,
      });
    }
  }

  export const updateVehicleById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;
    try {
      const updateVehicleById = await VehicleModel.findByIdAndUpdate(id, payload, {
        new: true,
      });
      if (updateVehicleById) {
        res.json({ ok: true, vehicle: updateVehicleById });
      } else {
        res.status(500).json({ ok: false, msg: "Error occurred to update Vehicle" });
      }
    } catch (error) {
      res.status(500).json({ ok: false, msg: "Error occurred", error });
    }
  }

  export const deleteVehicleById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const deleteVehicle = await VehicleModel.findByIdAndDelete(id);
      if (deleteVehicle) {
        res.json({ ok: true, msg: "Vehicle deleted" });
      } else {
        res.status(500).json({ ok: false, msg: "Error occurred to delete product" });
      }
    } catch (error) {
      res.status(500).json({ ok: false, msg: "Error occurred", error });
    }
  }

  