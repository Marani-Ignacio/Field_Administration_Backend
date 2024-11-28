import { Router } from "express";
import usersRouter from "./users.route";
import fieldsRouter from "./fields.route";
import seedsRouter from "./seeds.route";

const router = Router();

router.use("/users", usersRouter);
router.use("/fields", fieldsRouter);
router.use("/seeds", seedsRouter);

export default router;
