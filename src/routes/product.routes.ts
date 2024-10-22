import { Router } from "express";
import { createProduct, deleteProductById, getProductById, getProducts, updateProductById } from "../controllers/products.controller";
import { validateJWT } from "../middlewares/validate-jwt";

const router = Router();

router.get('/', validateJWT, getProducts)
router.get('/id/:id',getProductById)
router.post('/create',createProduct)
router.put('/update/:id',updateProductById)
router.delete('/delete/:id',deleteProductById)

export default router