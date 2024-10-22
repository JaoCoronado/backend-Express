import { validateJWT } from './../middlewares/validate-jwt';
import { Router } from "express";
import { createStore, getStoreById, getStores,updateStore } from "../controllers/store.controller";
import { deleteProductById, updateProductById } from "../controllers/products.controller";

const router = Router()


router.get('/', getStores)//validateJWT
router.get('/:id',getStoreById)
router.post('/create',createStore)//validateJWT
router.put('/update/:id', updateStore)
router.put('/update/:id',updateProductById)
router.delete('/delete/:id',deleteProductById)

export default router

