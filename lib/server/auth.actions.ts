'use server'
import { headers } from "next/headers";
import { auth } from "./auth";
import { prisma } from '@/lib/server/prisma'

// /sign-up/email

export const signUp = async (name: string, email: string, password: string) => {
    try {
        const data = await auth.api.signUpEmail({
            body: {
                name,
                email,
                password,
                callbackURL: "http://localhost:3000",
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
                callbackURL: "http://localhost:3000",

            },
        });

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
        console.log(error)
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