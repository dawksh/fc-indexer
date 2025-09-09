import { config } from "dotenv";
import z from "zod";

config()

const envSchema = z.object({
    HUB_API_URL: z.string(),
    REDIS_URL: z.string(),
    PINO_LOG_LEVEL: z.string().optional(    )
})

const env = envSchema.parse(process.env)

export default env
