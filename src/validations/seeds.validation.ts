import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const createSeedBodyValidationSchema = Joi.object({
  name: Joi.string().min(3).max(250).required(),
  description: Joi.string().allow("").optional(),
  fields: Joi.array().items(Joi.string()),
});

export const createSeedValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = createSeedBodyValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
      error: true,
    });
  }
  next();
};

const updateSeedBodyValidationSchema = Joi.object({
  name: Joi.string().min(3).max(250).optional(),
  description: Joi.string().allow("").optional(),
  fields: Joi.array().items(Joi.string()).optional(),
});

const seedParamValidationSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export const updateSeedValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error: bodyError } = updateSeedBodyValidationSchema.validate(
    req.body
  );
  const { error: paramError } = seedParamValidationSchema.validate(req.params);
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

export const deleteSeedValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = seedParamValidationSchema.validate(req.params);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
      error: true,
    });
  }

  next();
};
