import { NextFunction, Request, Response } from "express";
import firebaseApp from "../config/firebase";
import { User } from "../models";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      next("Provide a token");
      return;
    }

    if (!authorization.startsWith("Bearer ")) {
      next("Invalid token format");
      return;
    }

    const token = authorization.split(" ")[1];

    const { uid } = await firebaseApp.auth().verifyIdToken(token);

    const user = await User.findOne({ firebaseUid: uid });

    if (!user) {
      next("User not found");
      return;
    }

    res.locals.userId = user._id;

    next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error.errorInfo.code);
    if (error.errorInfo.code === "auth/argument-error") {
      next("Provide a token");
    }
    if (error.errorInfo.code === "auth/id-token-expired") {
      next("Token has expired");
    }
    next(error.message);
  }
};
