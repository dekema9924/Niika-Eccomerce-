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
    baseURL: process.env.BETTER_AUTH_URL,
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    socialProviders: {
        google: {
            prompt: "select_account",
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }
    },
    emailAndPassword: {
        enabled: true,
        autoSignIn: false
        // requireEmailVerification: true
    },
    session: {
        expiresIn: 60 * 60 * 24 * 5,//5 days
        updateAge: 60 * 60 * 24, //Update session once per day
    },
    trustedOrigins: ["http://localhost:3000", "https://niika-eccomerce.vercel.app"],
    plugins: [nextCookies()]

});