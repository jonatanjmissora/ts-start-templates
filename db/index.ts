import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"

import * as schema from "./schema.ts"

const client = neon(process.env.DATABASE_URL as string)
export const db = drizzle(client, { schema })
