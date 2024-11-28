import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const createUserBodyValidationSchema = Joi.object({
  name: Joi.string().min(3).max(250).required(),
  lastName: Joi.string().required(),
  birthDate: Joi.date().required(),
  email: Joi.string().email().required(),
  dni: Joi.number().required(),
  isAdmin: Joi.boolean().optional().default(false),
  firebaseUid: Joi.string().required(),
});

export const createUserValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = createUserBodyValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
      error: true,
    });
  }
  next();
};

const updateUserBodyValidationSchema = Joi.object({
  name: Joi.string().min(3).max(250).optional(),
  lastName: Joi.string().optional(),
  birthDate: Joi.date().optional(),
  email: Joi.string().email().optional(),
  dni: Joi.number().optional(),
  isAdmin: Joi.boolean().optional(),
  firebaseUid: Joi.string().optional(),
});

const userParamValidationSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export const updateUserValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error: bodyError } = updateUserBodyValidationSchema.validate(
    req.body
  );
  const { error: paramError } = userParamValidationSchema.validate(req.params);
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

export const deleteUserValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = userParamValidationSchema.validate(req.params);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
      error: true,
    });
  }

  next();
};
