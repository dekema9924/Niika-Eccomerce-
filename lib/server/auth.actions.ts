'use server'
import { auth } from "./auth";

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
export const signIn = async (email: string, password: string, rememberMe: boolean) => {
    try {
        const data = await auth.api.signInEmail({
            body: {
                email,
                password,
                rememberMe,
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




