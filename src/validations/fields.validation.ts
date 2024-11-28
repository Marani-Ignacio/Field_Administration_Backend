import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const createFieldBodyValidationSchema = Joi.object({
  name: Joi.string().min(3).max(250).required(),
  hectare: Joi.number().required(),
  location: Joi.string().min(5).max(250).required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  isActive: Joi.boolean().optional().default(true),
  ownerId: Joi.string().required(),
  seedId: Joi.string().required(),
});

export const createFieldValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = createFieldBodyValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
      error: true,
    });
  }
  next();
};

const updateFieldBodyValidationSchema = Joi.object({
  name: Joi.string().min(3).max(250).optional(),
  hectare: Joi.number().optional(),
  location: Joi.string().min(5).max(250).optional(),
  latitude: Joi.number().optional(),
  longitude: Joi.number().optional(),
  isActive: Joi.boolean().optional().default(true),
  ownerId: Joi.string().optional(),
  seedId: Joi.string().optional(),
});

const fieldParamValidationSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export const updateFieldValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error: bodyError } = updateFieldBodyValidationSchema.validate(
    req.body
  );
  const { error: paramError } = fieldParamValidationSchema.validate(req.params);
  if (paramError || bodyError) {
    return res.status(400).json({
      message: paramError
        ? paramError.details[0].message
        : bodyError?.details[0].message,
      error: true,
    });
  }

  next();
};

export const deleteFieldValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = fieldParamValidationSchema.validate(req.params);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
      error: true,
    });
  }

  next();
};
