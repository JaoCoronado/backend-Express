import { Request, Response } from "express";
import { ProductModel } from "../models/product.model";

export const getProducts = async (req: Request, res: Response) => {
    try {
      const getAllProducts = await ProductModel.find({});
      res.json({ ok: true, products: getAllProducts });
    } catch (error) {
      res.status(500).json({ ok: false, msg: "Error occurred", error });
    }
  }

  export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const getProductById = await ProductModel.findById(id);
      res.json({ ok: true, product: getProductById });
    } catch (error) {
      res.status(500).json({ ok: false, msg: "Error occurred", error });
    }
  }

  export const createProduct = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const newProduct = new ProductModel(body);
      const saveProduct = await newProduct.save();
      res.status(201).json({
        ok: true,
        msg: "Product Created",
        product: saveProduct,
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

  export const updateProductById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;
    try {
      const updateProductById = await ProductModel.findByIdAndUpdate(id, payload, {
        new: true,
      });
      if (updateProductById) {
        res.json({ ok: true, user: updateProductById });
      } else {
        res.status(500).json({ ok: false, msg: "Error occurred to update product" });
      }
    } catch (error) {
      res.status(500).json({ ok: false, msg: "Error occurred", error });
    }
  }

  export const deleteProductById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const deleteProduct = await ProductModel.findByIdAndDelete(id);
      if (deleteProduct) {
        res.json({ ok: true, msg: "Product deleted" });
      } else {
        res.status(500).json({ ok: false, msg: "Error occurred to delete product" });
      }
    } catch (error) {
      res.status(500).json({ ok: false, msg: "Error occurred", error });
    }
  }

  