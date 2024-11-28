import { NextFunction, Request, Response } from 'express';
import { Field, Seed } from '../models';

export const getFields = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const fields = await Field.find()
      .populate('ownerId', 'name lastName dni')
      .populate('seedId', 'name');
    return res.status(200).json({
      message: 'Fields retrived successfully',
      error: false,
      data: fields
    });
  } catch (error) {
    next(error);
  }
};

export const getFieldsByOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ownerId } = req.params;
    const fields = await Field.find({ ownerId })
      .populate('ownerId', 'name lastName dni')
      .populate('seedId', 'name');

    if (!fields || fields.length === 0) {
      return res.status(404).json({
        message: 'No fields found for the given owner',
        error: true,
        data: undefined
      });
    }

    return res.status(200).json({
      message: 'Fields retrieved successfully',
      error: false,
      data: fields
    });
  } catch (error) {
    next(error);
  }
};

export const getFieldByOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ownerId } = req.params;
    const { id } = req.query;
    const field = await Field.findOne({ ownerId, _id: id })
      .populate('ownerId', 'name lastName dni')
      .populate('seedId', 'name');
    if (!field) {
      return res.status(404).json({
        message: 'Field not found',
        error: true,
        data: undefined
      });
    }
    return res.status(200).json({
      message: 'Field retrived successfully',
      error: false,
      data: field
    });
  } catch (error) {
    next(error);
  }
};

export const getField = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const field = await Field.findById(req.params.id).populate(
      'seedId',
      'name'
    );
    if (!field) {
      return res.status(404).json({
        message: 'Field not found',
        error: true,
        data: undefined
      });
    }
    return res.status(200).json({
      message: 'Field retrived successfully',
      error: false,
      data: field
    });
  } catch (error) {
    next(error);
  }
};

export const getFieldsBySeed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const seed = await Seed.findById(req.params.id).populate('fields');
    if (!seed) {
      return res.status(404).json({
        message: 'Seed not found',
        error: true,
        data: undefined
      });
    }
    return res.status(200).json({
      message: 'Fields retrived successfully',
      error: false,
      data: seed?.fields
    });
  } catch (error) {
    next(error);
  }
};

export const createField = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newField = await Field.create(req.body);

    await Seed.findByIdAndUpdate(req.body.seedId, {
      $push: { fields: newField._id }
    });

    return res.status(201).json({
      message: 'Field created successfully',
      data: newField,
      error: false
    });
  } catch (error) {
    next(error);
  }
};

export const updateField = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updateField = await Field.findByIdAndUpdate(req.params.id, {
      ...req.body
    });
    return res.status(200).json({
      message: 'Field updated successfully',
      data: updateField,
      error: false
    });
  } catch (error) {
    next(error);
  }
};

export const deleteField = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const field = await Field.findByIdAndDelete(req.params.id);
    if (!field) {
      return res.status(404).json({ message: 'Field not found', error: true });
    }
    await Seed.findByIdAndUpdate(field.seedId, {
      $pull: { fields: field._id }
    });

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
