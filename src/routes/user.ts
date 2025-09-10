import { Router } from "express";
import { getUser, saveUser } from "../controllers/user";

const userRouter = Router().get("/", getUser).post("/", saveUser);

export default userRouter;
