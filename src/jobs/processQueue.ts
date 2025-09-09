import redis, { putUserConnection, removeConnection } from "../lib/redis";
import { MessageData, MessageType } from "@farcaster/hub-nodejs";
import logger from "../lib/logger";

const QUEUE_NAME = "fc-messages";

async function* queueIterator(): AsyncIterableIterator<MessageData> {
  while (true) {
    try {
      const item = await redis.blPop(QUEUE_NAME, 1);
      if (item) {
        const messageData = JSON.parse(item.element) as MessageData;
        yield messageData;
      } else {
        // Queue is empty, wait a bit before checking again
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } catch (error) {
      logger.error(`Error processing queue item: ${error}`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

const processQueue = async () => {
  logger.info(`Queue Started`);
  for await (const messageData of queueIterator()) {
    if (messageData.type == MessageType.LINK_ADD) {
      putUserConnection({
        fid: messageData.fid,
        connection: messageData.linkBody?.targetFid ?? 0,
      });
    }
    if (messageData.type == MessageType.LINK_REMOVE) {
      removeConnection({
        fid: messageData.fid,
        connection: messageData.linkBody?.targetFid ?? 0,
      });
    }
  }
};

export default processQueue;
export { queueIterator };
