import processHubMessages from "./jobs/processHubMessages";
import redis from "./lib/redis";

redis.connect().then(() => {
  processHubMessages();
});
