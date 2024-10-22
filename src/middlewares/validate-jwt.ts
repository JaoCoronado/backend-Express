import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");

export interface CustomRequest extends Request {
  uid?: number;
}

export const validateJWT = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No token in request",
    });
  }

  try {
    const { uid, login} = jwt.verify(token, process.env.JWT_SECRET);

    req.uid = uid;
    console.log(uid,login)

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Invalid Token",
    });
  }
};
