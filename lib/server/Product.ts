
'use server'
import { prisma } from "./prisma"

export const searchProduct = async (query: string) => {
    if (!query || query.trim().length < 2) {
        return []
    }

    try {
        const products = await prisma.product.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: 'insensitive' } },
                    { description: { contains: query, mode: 'insensitive' } },
                    {
                        category: {
                            name: { contains: query, mode: 'insensitive' }
                        }
                    }
                ],
                isActive: true // Only show active products
            },
            include: {
                images: true,
                category: true,
                variants: true
            },
            take: 10 // Limit results
        })

        // Serialize Decimal fields
        return products.map(product => ({
            ...product,
            price: product.price.toNumber(),
            discountPrice: product.discountPrice?.toNumber() || null
        }))
    } catch (err) {
        console.error('Search error:', err)
        return []
    }
}