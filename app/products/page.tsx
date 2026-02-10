
'use server'
import { prisma } from '@/lib/server/prisma'
import Products from "@/components/layout/home/Products"
import Link from "next/link"
import TrustSection from "@/components/layout/home/TrustSection"
import { ProductInterface } from '@/types/product'


export default async function AllProductspage() {
    const products = await prisma.product.findMany({
        include: { images: true }
    })

    const formattedProducts: ProductInterface[] = products.map(p => ({
        id: p.id,
        image: p.images[0]?.url || '',  // First image
        name: p.name,  // Map name to title
        price: Number(p.price),
        discountPrice: p.discountPrice ? Number(p.discountPrice) : null,
        isActive: p.isActive,
        description: p.description,
        isOutOfStock: p.isOutOfStock,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
        categoryId: p.categoryId
    }))


    return (
        <>
            <div className="p-4 sm:p-7 max-w-7xl mx-auto">
                {/* Breadcrumb navigation */}
                <div className="flex gap-2 text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8">
                    <Link href={'/'} className="hover:text-gray-700">Home</Link>
                    <span>/</span>
                    <span className="text-black">All Products</span>
                </div>

                <Products heading="All Products" products={formattedProducts} />
            </div>
            <TrustSection />

        </>
    )
}
