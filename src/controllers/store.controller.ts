import { Request, Response } from "express";
import { StoreModel } from "../models/store.model";
import { UserModel } from "../models/user.model";

export const getStores = async (req: Request, res: Response) => {
  try {
    const getAllStores = await StoreModel.find().populate({
      path: "admin",
      select: "name email",
    });
    
    res.json({ ok: true, stores: getAllStores });
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Error occurred", error });
  }
};

export const getStoreById = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (id === "" || id === null || id === undefined) return "debe enviar un id";

  try {
    const getStoreById = await StoreModel.findOne({ id });
    if (getStoreById) {
      res.json({ ok: true, store: getStoreById });
    } else {
      res
        .status(500)
        .json({ ok: false, msg: "no se encontro una tienda con ese id" });
    }
  } catch (error) {
    res.status(500).json({ ok: false, msg: `ocurrio un error: ${error}` });
  }
};

export const createStore = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const { admin } = req.body;

    const newStore = new StoreModel({
      ...data,
    });

    const user = await UserModel.findById(admin);

    if (!user) return res.status(400).json({ ok: false, msg: "usario no registrado" });

    const saveStore = await newStore.save();

    if (saveStore) {
      res.json({ ok: true, msg: "tienda creada correctamente" });
    }
  } catch (error) {
    res.status(401).json({ ok: false, msg: `ocurrion un error: ${error}` });
  }
};

export const updateStore = async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  if (id === "" || id === null || id === undefined) return "debe enviar un id";
  if (!data) return "debe enviar datos para actualizar la tienda";

  try {
    const updateStore = await StoreModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (updateStore) {
      res.json({ ok: true, store: updateStore });
    } else {
      res.json({ ok: false, msg: `no se pudo actualizar la tienda` });
    }
  } catch (error) {
    res.status(401).json({ ok: false, msg: `ocurrio un error: ${error}` });
  }
};

export const deleteStore = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (id === "" || id === null || id === undefined) return "debe enviar un id";

  try {
    const deleteStore = await StoreModel.findByIdAndDelete(id);
    if (deleteStore) {
      res.json({ ok: true, msg: "tienda eliminada correctamente" });
    } else {
      res.json({ ok: false, msg: "la tienda no se pudo eliminar" });
    }
  } catch (error) {
    res.status(401).json({ ok: false, msg: `ocurrio un error: ${error}` });
  }
};
