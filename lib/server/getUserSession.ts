
'use server'
import { auth } from "./auth";
import { headers } from "next/headers";


export const getUserSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) return

    return session

}

