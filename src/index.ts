import processHubMessages from "./jobs/processHubMessages";
import processQueue from "./jobs/processQueue";
import env from "./lib/env";
import logger from "./lib/logger";
import redis from "./lib/redis";
import express from "express"
import { userRouter } from "./routes";


const PORT = env.PORT

const app = express()

app.use(express.json())
app.use("/user", userRouter)

app.listen(PORT, () => {
  logger.info("🚀 Server Started")
  redis.connect().then(() => {
    processHubMessages();
    processQueue()
  });
})
