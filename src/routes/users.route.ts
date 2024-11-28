import { Router } from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserByUID,
} from "../controllers";
import {
  createUserValidation,
  updateUserValidation,
  deleteUserValidation,
} from "../validations";

const router = Router();

router.get("/", getUsers);

router.get("/:id", getUser);

router.get("/Uid/:firebaseUid", getUserByUID);

router.post("/", createUserValidation, createUser);

router.patch("/:id", updateUserValidation, updateUser);

router.delete("/:id", deleteUserValidation, deleteUser);

export default router;
