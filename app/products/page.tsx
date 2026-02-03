

import Products from "@/components/layout/home/Products"
import Link from "next/link"
import { fakeProductsData } from "../helpers/fakeProductData"
import TrustSection from "@/components/layout/home/TrustSection"
export default function AllProductspage() {
    return (
        <>
            <div className="p-4 sm:p-7 max-w-7xl mx-auto">
                {/* Breadcrumb navigation */}
                <div className="flex gap-2 text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8">
                    <Link href={'/'} className="hover:text-gray-700">Home</Link>
                    <span>/</span>
                    <span className="text-black">All Products</span>
                </div>

                <Products heading="All Products" products={fakeProductsData} />
            </div>
            <TrustSection />

        </>
    )
}
