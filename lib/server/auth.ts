import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { nextCookies } from "better-auth/next-js";
import { emailOTP } from "better-auth/plugins";
import { transporter } from "./nodemailer";

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
        autoSignIn: false,
        // requireEmailVerification: true
        sendResetPassword: async ({ user, url, token }, request) => {
            void transporter.sendMail({
                to: user.email,
                subject: "Reset your password",
                text: `Click the link to reset your password: ${url}`,
            });
        },
    },

    advanced: {
        useSecureCookies: process.env.NODE_ENV === 'production'
    },
    session: {
        expiresIn: 60 * 60 * 24 * 5,//5 days
        updateAge: 60 * 60 * 24, //Update session once per day

    },



    trustedOrigins: ["http://localhost:3000", "https://niika-eccomerce.vercel.app"],
    plugins: [nextCookies(),
    emailOTP({
        async sendVerificationOTP({ email, otp, type }) {
            if (type === "sign-in") {
                // Send the OTP for sign in
            } else if (type === "email-verification") {
                // Send the OTP for email verification
                const message = {
                    from: 'NIIKA <no-reply@NIIKA-Eccomerce.com>',
                    to: email,
                    subject: "your OTP code",
                    text: `your otp for ${type} is ${otp}`,
                    html: `<p>Your OTP for ${type} is: <strong>${otp}</strong></p>`,


                }
                try {
                    await transporter.sendMail(message).then((res) => {
                        if (res.messageId) {
                            console.log("otp sent to email")
                        }
                    })
                } catch (err) {
                    console.error("Failed to send OTP:", err);

                }


            } else {
                // Send the OTP for password reset

            }
        },
    })]

});