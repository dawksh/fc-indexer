import { HubEventType } from "@farcaster/hub-nodejs"
import client from "../lib/farcaster"

const processHubMessages = async () => {
    try {
        console.log("Connecting to Farcaster Hub...")
        const sub = await client.subscribe({
            eventTypes: [HubEventType.MERGE_MESSAGE]
        })

        if(sub.isOk()) {
            console.log("Successfully connected to Farcaster Hub")
            for await (const event of sub.value) {
                const message = event.mergeMessageBody.message.data;
                const type = message.type;
                if (type == 5 || type == 6) {
                    console.log(message)
                }
            }
        } else {
            console.error("Failed to subscribe to hub:", sub.error)
        }
    } catch (error) {
        console.error("Error connecting to Farcaster Hub:", error)
    }
}

export default processHubMessages