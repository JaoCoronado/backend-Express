import { Router } from "express";
import { login, renewToken } from "../controllers/auth.controllers";
import { validateJWT } from "../middlewares/validate-jwt";

const router = Router();

router.post("/", login);
router.get("/renew", validateJWT, renewToken)

export default router;
