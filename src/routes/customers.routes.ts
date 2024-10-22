import { Router } from "express";
import { validateJWT } from "../middlewares/validate-jwt";
import { createCustomers, deleteCustomerById, getCusmoters, getCustomerById, updateCustomerById } from "../controllers/customers.controllers";

const router = Router();

router.get("/",validateJWT, getCusmoters);
router.get('/id/:id', getCustomerById);
router.post("/create", createCustomers);
router.put('/update/:id',updateCustomerById)
router.delete('/delete/:id',deleteCustomerById)

export default router