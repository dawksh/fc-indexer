import { HubEventType, MessageData, MessageType } from "@farcaster/hub-nodejs";
import client from "../lib/farcaster";
import { addToQueue } from "../lib/redis";
import logger from "../lib/logger";

const processHubMessages = async () => {
  try {
    logger.info("Connecting to Farcaster Hub...");
    const sub = await client.subscribe({
      eventTypes: [HubEventType.MERGE_MESSAGE],
    });

    if (sub.isOk()) {
      logger.info("Successfully connected to Farcaster Hub");
      for await (const event of sub.value) {
        const message = event.mergeMessageBody.message.data as MessageData;
        const type = message.type;
        if (type == MessageType.LINK_ADD || type == MessageType.LINK_REMOVE) {
          addToQueue({ data: message });
        }
      }
    } else {
      logger.error("Failed to subscribe to hub: " + sub.error);
    }
  } catch (error) {
    logger.error("Error connecting to Farcaster Hub: " + error);
  }
};

export default processHubMessages;
