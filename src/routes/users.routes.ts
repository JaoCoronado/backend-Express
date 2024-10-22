import { Router } from "express";
import { createUsers, getUserByDocumentoNumber, getUsers , getUserById, updateUserById, deleteUserById} from "../controllers/users.controller";
import { validateJWT } from "../middlewares/validate-jwt";
import {changePassword} from "../controllers/auth.controllers"

const router = Router();

router.get("/", getUsers);//validateJWT
router.get('/document/:document',validateJWT, getUserByDocumentoNumber)
router.get('/id/:id', getUserById)//validateJWT
router.post("/", createUsers);
router.put('/update/:id',updateUserById)//validateJWT
router.put('/updatePassword/:id', changePassword)//validateJWT
router.delete('/delete/:id',deleteUserById)//validateJWT


export default router