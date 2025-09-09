import { config } from "dotenv";
import z from "zod";

config()

const envSchema = z.object({
    HUB_API_URL: z.string(),
})

const env = z.parse(envSchema, process.env)

export default env
