import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/server/prisma"



export const GET = async (req: NextRequest, { params }: { params: { productId: string } }) => {
    let { productId } = await params

    try {
        let product = await prisma.product.findUnique({
            where: { id: productId },
            include: {
                images: {
                    orderBy: {
                        order: 'asc'
                    }
                },
                variants: true,
                category: true
            }
        })

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 })
        }
        // Transform to match ProductDetailsInterface
        const productDetails = {
            id: product.id,
            name: product.name,
            isActive: product.isActive,
            description: product.description,
            price: Number(product.price),
            discountPrice: product.discountPrice ? Number(product.discountPrice) : null,
            isOutOfStock: product.isOutOfStock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
            categoryId: product.categoryId,
            variants: product.variants,
            // Single image for list view
            image: product.images[0]?.url || '',

            // Extended fields for detail view
            images: product.images.map(img => img.url),
            category: product.category?.name || '',
            colors: [...new Set(product.variants.map(v => v.color).filter(Boolean))] as string[],
            sizes: [...new Set(product.variants.map(v => v.size).filter(Boolean))] as string[],
            estimatedDelivery: 'Within 3 days',
            deliveryDate: 'January 7-11',
            shippingInfo: 'Free standard shipping on orders $50+ and free 60-day returns for members.'
        }

        return NextResponse.json(productDetails, { status: 200 })

    } catch (err) {
        console.error("[PRODUCTS:ID_GET]", err)

        return NextResponse.json(
            { message: "Failed to fetch product" },
            { status: 500 }
        )
    }
}