import { Router } from "express";
import { getUser } from "../controllers/user";

const userRouter = Router().get("/", getUser);

export default userRouter;
