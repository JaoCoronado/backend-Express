import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";
import { generateJWT } from "../helpers/jwt";
import { CustomRequest } from "../middlewares/validate-jwt";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Verificar el email
    const userDB = await UserModel.findOne({ email });

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe este email",
      });
    }

    if (userDB.password) {
      // Verificar el Password
      const validPassword = bcrypt.compareSync(password, userDB.password);

      if (!validPassword) {
        return res.status(400).json({
          ok: false,
          msg: "Invalid Password",
          passwordMongoo: userDB.password,
          password: password,
        });
      }
    }

    // Generar Token
    const token = await generateJWT(userDB.id, userDB.email);

    res.json({
      ok: true,
      token,
      user: userDB,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      error,
      msg: "Login Error",
    });
  }
};
export const renewToken = async (req: CustomRequest, res: Response) => {
  const uid = req.uid;

  if (typeof uid === "undefined") {
    throw new Error("uid not provided");
  }

  const user = await UserModel.findById(uid);

  // generate Token
  const token = await generateJWT(uid.toString());
  res.json({
    ok: true,
    token,
    user,
  });
};

export const changePassword = async (req: CustomRequest, res: Response) => {
  const { oldPassword, newPassword } = req.body;
  const uid = req.uid;

  try {
    // Buscar al usuario por su ID
    const user = await UserModel.findById(uid);

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }

    // Verificar si la contraseña antigua es correcta
    if(user.password){

      const validOldPassword = bcrypt.compareSync(oldPassword, user.password);
      if (!validOldPassword) {
        return res.status(400).json({
          ok: false,
          msg: "password antigua es incorrecta",
        });
      }
    }

    // Hashear la nueva contraseña
    const salt = bcrypt.genSaltSync();
    const hashedNewPassword = bcrypt.hashSync(newPassword, salt);

    // Actualizar la contraseña en la base de datos
    user.password = hashedNewPassword;
    await user.save();

    res.json({
      ok: true,
      msg: "Password actualizada exitosamente",
      // token, // opcional
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error actualizando password",
    });
  }
};
