import { Router } from "express";
import todosRouter from "./todos.mjs";
import usersRouter from "./users.mjs";

const router = Router();

router.use(todosRouter);
router.use(usersRouter);

export default router;