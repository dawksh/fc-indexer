import { createClient } from "redis";
import env from "./env";
import { MessageData } from "@farcaster/hub-nodejs";
import { number } from "zod";

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
};

const storeFid = async ({ fid }: { fid: number }) => {
  await redis.sAdd("fc-fids", fid.toString());
};

const isMember = async ({ fid }: { fid: number }) => {
  return (await redis.sIsMember("fc-fids", fid.toString())) == 1;
};

export default redis;
export { addToQueue, putUserConnection, removeConnection, storeFid, isMember };
