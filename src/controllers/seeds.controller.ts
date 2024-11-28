import { NextFunction, Request, Response } from "express";
import { Seed, Field } from "../models";

export const getSeeds = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const seeds = await Seed.find().populate("fields", "name hectare location latitude longitude");
    return res.status(200).json({
      message: "Seeds retrived successfully",
      error: false,
      data: seeds,
    });
  } catch (error) {
    next(error);
  }
};

export const getSeed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const seed = await Seed.findById(req.params.id).populate("fields", "name hectare location latitude longitude");
    if (!seed) {
      return res.status(404).json({
        message: "Seed not found",
        error: true,
        data: undefined,
      });
    }
    return res.status(200).json({
      message: "Seed retrived successfully",
      error: false,
      data: seed,
    });
  } catch (error) {
    next(error);
  }
};

export const createSeed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newSeed = await Seed.create({ ...req.body });
    return res.status(201).json({
      message: "Seed created successfully",
      data: newSeed,
      error: false,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSeed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updateSeed = await Seed.findByIdAndUpdate(req.params.id, {
      ...req.body,
    });
    return res.status(200).json({
      message: "Seed updated successfully",
      data: updateSeed,
      error: false,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSeed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deleteSeed = await Seed.findByIdAndDelete(req.params.id);
    if (!deleteSeed) {
      return res.status(404).json({ message: "Seed not found", error: true });
    }
    await Field.updateMany(
      { seedId: deleteSeed._id },
      { $set: { seedId: null } }
    );

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
