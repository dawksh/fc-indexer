import { config } from "dotenv";
import z from "zod";

config()

const envSchema = z.object({
    HUB_API_URL: z.string()
})

const env = envSchema.parse(process.env)

export default env
