// Prisma example with the Neon serverless driver
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

neonConfig.poolQueryViaFetch = true;
const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaNeon({ connectionString });
const prisma =
	global.prisma ||
	new PrismaClient(process.env.NEXT_RUNTIME === "edge" ? { adapter } : {});

if (process.env.NEXT_RUNTIME !== "edge") global.prisma = prisma;

export default prisma;
