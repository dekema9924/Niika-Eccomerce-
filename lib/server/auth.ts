import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { nextCookies } from "better-auth/next-js";

const connectionString = process.env.DATABASE_URL
const adapter = new PrismaPg({ connectionString })

const prisma = new PrismaClient({ adapter });

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: false
        // requireEmailVerification: true
    },
    session: {
        expiresIn: 60 * 60,

        cookieCache: {
            enabled: false,
            maxAge: 60 * 60,
            strategy: "compact"
        }
    },
    trustedOrigins: ["http://localhost:3000", "https://example.com"],
    plugins: [nextCookies()]

});