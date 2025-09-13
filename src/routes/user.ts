import { Router } from "express";
import { getConnections, getUser, saveUser } from "../controllers/user";
const userRouter = Router()
  .get("/", getUser)
  .post("/", saveUser)
  .get("/connection", getConnections);

export default userRouter;
