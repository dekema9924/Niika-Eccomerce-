'use server'
import { headers } from "next/headers";
import { auth } from "./auth";
import { prisma } from '@/lib/server/prisma'
import { getUserSession } from "./getUserSession";



// /sign-up/email


export const signUp = async (name: string, email: string, password: string) => {
    try {
        const data = await auth.api.signUpEmail({
            body: {
                name,
                email,
                password,
            },
        });

        return { success: true, data }
    }
    catch (error: any) {
        console.log(error)
        return {
            success: false,
            error: error?.message ?? "Signup failed",
        };
    }

}


// /sign-in/email
export const signIn = async (email: string, password: string, rememberMe?: boolean) => {
    try {
        const data = await auth.api.signInEmail({
            body: {
                email,
                password,

            },
            headers: await headers()
        });

        if (data && !data.user.emailVerified) {
            await sendEmailOTP(data.user.email, "email-verification").then((res) => {
                console.log({
                    userEmail: data.user.email,
                    response: res
                })
            })

        }



        // If remember me is false, update the session expiration
        if (data.token) {
            await prisma.session.update({
                where: { token: data.token },
                data: {
                    expiresAt: new Date(Date.now() + (rememberMe ? 5 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000))
                    // rememberMe = true → 5 days
                    // rememberMe = false → 1 hour
                }
            })

        }
        return { success: true, data }
    }
    catch (error: any) {
        console.error(error)
        return {
            success: false,
            error: error?.message ?? "Signup failed",
        };
    }

}


// /sign-out
export const signOut = async () => {
    try {

        await auth.api.signOut({
            headers: await headers()
        })
        return { success: true }
    }
    catch (error: any) {
        console.log(error)
        return {
            success: false,
            error: error?.message ?? "Signout failed",
        };
    }

}


//Oauth signin
export const SocialSignin = async (provider: string) => {
    try {

        const data = await auth.api.signInSocial({
            body: { provider },
            headers: await headers()
        });
        return { success: true, data }
    }
    catch (error: any) {
        console.log(error)
        return {
            success: false,
            error: error?.message ?? `${provider} sign in failed`,
        };
    }

}


//sendOTP
export const sendEmailOTP = async (email: string, type: "sign-in" | "email-verification" | "forget-password") => {
    try {
        const data = await auth.api.sendVerificationOTP({
            body: {
                email: email,
                type, // required
            },
        });
        return { success: true, data }
    }
    catch (error: any) {
        console.log(error)
        return {
            success: false,
            error: error?.message ?? `failed to send OTP`,
        };
    }

}


//VerifyEmailOTP
export const verifyEmailOTP = async (email: string, otp: string) => {
    try {
        const data = await auth.api.verifyEmailOTP({
            body: {
                email,
                otp
            },
        });
        return { success: true, data }
    }
    catch (error: any) {
        console.log(error)
        return {
            success: false,
            error: error?.message ?? `Invalid OTP`,
        };
    }

}


//send password OTP
export const sendResetPasswordOtp = async (email: string, url: string) => {
    try {
        const data = await auth.api.requestPasswordReset({
            body: {
                email,
                redirectTo: url
            },
        });
        return { success: true, data }
    }
    catch (error: any) {
        console.log(error)
        return {
            success: false,
            error: error?.message ?? `failed to send otp`,
        };
    }

}


//reset-password
export const ResetUserPassword = async (newPassword: string, token: string) => {
    try {
        const data = await auth.api.resetPassword({
            body: {
                newPassword,
                token

            },
        });
        return { success: true, data }
    }
    catch (error: any) {
        console.log(error)
        return {
            success: false,
            error: error?.message ?? `invalid token`,
        };
    }

}







