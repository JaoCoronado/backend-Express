// import { getWorkOrderById } from './../controllers/workOrder.controller';
import { validateJWT } from "../middlewares/validate-jwt";
import { Router } from "express";
import {
  createWorkOrder,
  getWorkOrders,
  getWorkOrderById,
  updateWorkOrderById,
  deleteWorkOrderById,
} from "../controllers/workOrder.controller";
import {
  deleteVehicleById,
  updateVehicleById,
} from "../controllers/vehicle.controller";

const router = Router();

// rutas
router.post("/create", createWorkOrder);
router.get("/", getWorkOrders);
router.get("/:id", getWorkOrderById);
router.put("/update/:id", updateWorkOrderById);
router.delete("/delete/:id", deleteWorkOrderById);

export default router;
