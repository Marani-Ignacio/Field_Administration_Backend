import { Router } from "express";
import {
  getField,
  getFieldsBySeed,
  getFields,
  createField,
  updateField,
  deleteField,
  getFieldsByOwner,
} from "../controllers";
import {
  createFieldValidation,
  updateFieldValidation,
  deleteFieldValidation,
} from "../validations";
import { authMiddleware } from "../middlewares"; 

const router = Router();

router.get("/", getFields);

router.get("/myFields/:ownerId", getFieldsByOwner);

router.get("/:id", authMiddleware, getField);

router.get("/seed/:id", getFieldsBySeed);

router.post("/", createFieldValidation, createField);

router.patch("/:id", updateFieldValidation, updateField);

router.delete("/:id", deleteFieldValidation, deleteField);

export default router;
