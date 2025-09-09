import { createClient } from "redis";
import env from "./env";
import { MessageData } from "@farcaster/hub-nodejs";

const redis = createClient({
  url: env.REDIS_URL,
});

const addToQueue = async ({ data }: { data: MessageData }) => {
  await redis.rPush("fc-messages", JSON.stringify(data));
};

export default redis;
export { addToQueue };
