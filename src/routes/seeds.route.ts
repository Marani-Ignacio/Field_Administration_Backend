import { Router } from "express";
import {
  getSeed,
  getSeeds,
  createSeed,
  updateSeed,
  deleteSeed,
} from "../controllers";
import {
  createSeedValidation,
  updateSeedValidation,
  deleteSeedValidation,
} from "../validations";

const router = Router();

router.get("/", getSeeds);

router.get("/:id", getSeed);

router.post("/", createSeedValidation, createSeed);

router.patch("/:id", updateSeedValidation, updateSeed);

router.delete("/:id", deleteSeedValidation, deleteSeed);

export default router;
