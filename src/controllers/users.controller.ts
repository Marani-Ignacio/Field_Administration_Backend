import { NextFunction, Request, Response } from "express";
import { User } from "../models";
import firebaseApp from "../config/firebase";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      message: "Users retrieved successfully",
      error: false,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        data: undefined,
      });
    }
    return res.status(200).json({
      message: "User retrieved successfully",
      error: false,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserByUID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ firebaseUid: req.params.firebaseUid });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        data: undefined,
      });
    }

    return res.status(200).json({
      message: "User retrieved successfully",
      error: false,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = await User.create({ ...req.body });
    return res.status(201).json({
      message: "User created successfully",
      data: newUser,
      error: false,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const birthDate = new Date(req.body.birthDate);
  try {
    const existingUser = await User.findById(req.params.id);
    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
        error: true,
      });
    }

    await firebaseApp.auth().updateUser(existingUser.firebaseUid, {
      email: req.body.email,
    });

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        birthDate,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
      error: false,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userToDelete = await User.findById(req.params.id);
    if (!userToDelete) {
      return res.status(404).json({ message: "User not found", error: true });
    }

    await firebaseApp.auth().deleteUser(userToDelete.firebaseUid);

    await User.findByIdAndDelete(req.params.id);

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
