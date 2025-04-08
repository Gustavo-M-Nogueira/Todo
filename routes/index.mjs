import { Router } from "express";
import todosRouter from "./todos.mjs";
import usersRouter from "./users.mjs";
import authRouter from "./auth.mjs";

const router = Router();

router.use(todosRouter);
router.use(usersRouter);
router.use(authRouter);

export default router;