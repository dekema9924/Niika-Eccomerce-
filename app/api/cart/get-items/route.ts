import { getUserSession } from "@/lib/server/getUserSession"
import { prisma } from "@/lib/server/prisma"
import { NextRequest, NextResponse } from "next/server"


export const GET = async (req: NextRequest) => {
    try {
        const session = await getUserSession()
        console.log("cookies", req.cookies.getAll())

        console.log("session", session)

        if (!session) {
            return NextResponse.json(
                { message: "UNAUTHORIZED" },
                { status: 401 }
            )
        }

        const cart = await prisma.cart.findUnique({
            where: { userId: session.user.id },
            include: { items: true },
        })


        if (!cart) {
            console.error("Cart missing for user:", session.user.id)

            return NextResponse.json(
                { message: "Cart initialization error" },
                { status: 500 }
            )
        }

        return NextResponse.json(
            {
                cart,
                isEmpty: cart.items.length === 0,
            },
            { status: 200 }
        )
    } catch (error) {
        console.error("GET /cart error:", error)

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }
}

