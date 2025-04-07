import { Router } from "express";
import todosRouter from "./todos.mjs";

const router = Router();

router.use(todosRouter);

export default router;