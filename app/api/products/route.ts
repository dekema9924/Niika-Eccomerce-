import { prisma } from "@/lib/server/prisma"
import { NextRequest, NextResponse } from "next/server"




//get all products

export const GET = async (req: NextRequest) => {
    try {
        let products = await prisma.product.findMany()
        if (products) {
            return NextResponse.json(products, { status: 200 })
        }
    } catch (err) {
        console.error("[PRODUCTS_GET]", err)

        return NextResponse.json(
            { message: "Failed to fetch products" },
            { status: 500 }
        )
    }
}