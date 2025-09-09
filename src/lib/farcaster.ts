import { getSSLHubRpcClient } from "@farcaster/hub-nodejs";
import env from "./env";

const HUB_API_URL = env.HUB_API_URL;

const client = getSSLHubRpcClient(HUB_API_URL)

export default client