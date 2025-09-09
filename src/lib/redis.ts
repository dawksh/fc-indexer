import { createClient } from "redis";
import env from "./env";
import { MessageData } from "@farcaster/hub-nodejs";

const redis = createClient({
  url: env.REDIS_URL,
});

const addToQueue = async ({ data }: { data: MessageData }) => {
  await redis.rPush("fc-messages", JSON.stringify(data));
};

const putUserConnection = async ({
  fid,
  connection,
}: {
  fid: number;
  connection: number;
}) => {
  await redis.sAdd(`fc-user-connections:${fid}`, connection.toString());
};

const removeConnection = async ({
  fid,
  connection,
}: {
  fid: number;
  connection: number;
}) => {
  await redis.sRem(`fc-user-connections:${fid}`, connection.toString());
}

export default redis;
export { addToQueue, putUserConnection, removeConnection };
