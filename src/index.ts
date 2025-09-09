import processHubMessages from "./jobs/processHubMessages";
import processQueue from "./jobs/processQueue";
import redis from "./lib/redis";

redis.connect().then(() => {
  processHubMessages();
  processQueue()
});
