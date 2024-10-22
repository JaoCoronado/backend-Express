import { Router } from "express";
import { createVehicle, deleteVehicleById, getVehicleById, getVehicles, updateVehicleById } from "../controllers/vehicle.controller";
import { validateJWT } from "../middlewares/validate-jwt";

const router = Router();

router.get('/',  getVehicles)//validateJWT
router.get('/id/:id',getVehicleById)
router.post('/create',createVehicle)
router.put('/update/:id',updateVehicleById)
router.delete('/delete/:id',deleteVehicleById)

export default router