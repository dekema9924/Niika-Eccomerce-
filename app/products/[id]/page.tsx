'use client'
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import InfiniteMarquee from "@/components/ui/InfiniteMarquee"
import SimilarProducts from "@/components/layout/productdetails/SimilarProducts"
import SubscribeForm from "@/components/layout/SubscribeForm"


export default function ProductDetailsPage() {
    const { id } = useParams()

    // Mock product data - replace with actual data fetching
    const product = {
        id: id,
        title: "Stylish Model in Floral Shirt",
        category: "Men's jumpsuits",
        price: 208,
        originalPrice: 247,
        status: "Out of stock",
        images: [
            "https://plus.unsplash.com/premium_photo-1673384389967-e31ea744f3eb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8eWVsbG93JTIwZHJlc3N8ZW58MHx8MHx8fDA%3D",
            "https://images.unsplash.com/photo-1671097828702-e0b4950a547c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8eWVsbG93JTIwZHJlc3N8ZW58MHx8MHx8fDA%3D",
            "https://plus.unsplash.com/premium_photo-1673384389447-5a4364e7c93b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1621143814870-d28ef0bb3844?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8eWVsbG93JTIwZHJlc3N8ZW58MHx8MHx8fDA%3D"
        ],
        colors: ["Pink", "Brown"],
        sizes: ["X-Small", "Small", "Medium", "Large", "X-Large"],
        estimatedDelivery: "Within 3 days",
        deliveryDate: "January 7-11",
        description: "The image features a young person with a slender build, wearing a stylish white shirt printed with large pink flowers and green leaves, likely made of a silky or smooth fabric.",
        shippingInfo: "Free standard shipping on orders $50+ and free 60-day returns for Minna Members."
    }

    return (
        <>
            <main className="p-4 sm:p-7 max-w-7xl mx-auto">
                {/* Breadcrumb navigation */}
                <div className="flex gap-2 text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8">
                    <Link href={'/'} className="hover:text-gray-700">Home</Link>
                    <span>/</span>
                    <Link href={'/products'} className="hover:text-gray-700">All products</Link>
                    <span>/</span>
                    <span className="text-black">Product details</span>
                </div>

                {/* Product details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left side - Images */}
                    <div className="flex flex-col gap-4 sm:gap-6">
                        <div className="flex gap-3 sm:gap-4">
                            {/* Thumbnail images */}
                            <div className="flex flex-col gap-2 sm:gap-3">
                                {product.images.map((img, index) => (
                                    <div
                                        key={index}
                                        className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 border-2 border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:border-gray-400 transition"
                                    >
                                        <Image
                                            src={img}
                                            alt={`Product view ${index + 1}`}
                                            width={80}
                                            height={80}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Main image */}
                            <div className="flex-1 aspect-square bg-[#E5D5C6] rounded-2xl overflow-hidden">
                                <Image
                                    src={product.images[0]}
                                    alt={product.title}
                                    width={600}
                                    height={600}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Promo banner - Full width spanning from thumbnails to main image */}
                        <div className="relative bg-linear-to-r from-pink-100 to-pink-50 border-2 border-dashed border-pink-300 rounded-lg p-3 sm:p-4 overflow-hidden">
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                                <span className="font-medium whitespace-nowrap">On the first purchase</span>
                                <span className="text-blue-600 font-bold text-sm sm:text-lg whitespace-nowrap" style={{ textShadow: '2px 2px 0px white, -2px -2px 0px white, 2px -2px 0px white, -2px 2px 0px white' }}>FREE shipping!</span>
                                <div className="bg-yellow-300 px-2 sm:px-3 py-1 rounded font-bold flex items-center gap-1 sm:gap-2">
                                    <span className="text-xs">CODE</span>
                                    <span className="text-xs sm:text-sm">FIRST50</span>
                                </div>
                                <span className="font-bold whitespace-nowrap">50% DISCOUNT</span>
                            </div>
                            <span className="absolute top-1 right-2 sm:top-2 sm:right-2 text-lg sm:text-2xl">✨</span>
                            <span className="absolute bottom-1 left-2 sm:bottom-2 sm:left-2 text-base sm:text-xl">🎈</span>
                        </div>
                    </div>

                    {/* Right side - Product info */}
                    <div>
                        <p className="text-xs sm:text-sm text-gray-600 mb-2">{product.category}</p>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">{product.title}</h1>

                        {/* Pricing */}
                        <div className="flex items-center gap-3 sm:gap-4 mb-2">
                            <span className="text-3xl sm:text-4xl font-bold text-[#FF6B35]">${product.price}</span>
                            <span className="text-xl sm:text-2xl text-gray-400 line-through">${product.originalPrice}</span>
                        </div>
                        <p className="text-red-600 font-medium mb-6 sm:mb-8">{product.status}</p>

                        {/* Color selection */}
                        <div className="mb-6">
                            <h3 className="font-semibold mb-3">COLOR</h3>
                            <div className="flex gap-3 flex-wrap">
                                {product.colors.map((color) => (
                                    <button
                                        key={color}
                                        className={`px-5 sm:px-6 py-2 border-2 rounded-md font-medium transition text-sm sm:text-base ${color === "Pink"
                                            ? "bg-black text-white border-black"
                                            : "border-gray-300 hover:border-gray-400"
                                            }`}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Size selection */}
                        <div className="mb-6 sm:mb-8">
                            <h3 className="font-semibold mb-3">SIZE</h3>
                            <div className="flex gap-2 sm:gap-3 flex-wrap">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        className={`px-4 sm:px-5 py-2 border-2 rounded-md font-medium transition text-sm sm:text-base ${size === "X-Small"
                                            ? "bg-black text-white border-black"
                                            : "border-gray-300 hover:border-gray-400"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity and Add to Cart */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8">
                            <div className="flex items-center border-2 border-gray-300 rounded-md w-full sm:w-auto">
                                <button className="px-4 py-3 hover:bg-gray-100 transition">−</button>
                                <input
                                    type="number"
                                    value="1"
                                    className="w-16 text-center border-x-2 border-gray-300 py-3"
                                    readOnly
                                />
                                <button className="px-4 py-3 hover:bg-gray-100 transition">+</button>
                            </div>
                            <button className="flex-1 bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition">
                                Add to Cart
                            </button>
                        </div>

                        {/* Delivery info */}
                        <div className="space-y-3 mb-6 sm:mb-8">
                            <div className="flex items-center gap-3 text-green-700">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                                <span className="font-medium text-sm sm:text-base">Estimated Delivery: {product.estimatedDelivery}</span>
                            </div>
                            <div className="flex items-center gap-3 text-green-700">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="font-medium text-sm sm:text-base">Delivery date: {product.deliveryDate}</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-6 sm:mb-8">
                            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Description</h3>
                            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{product.description}</p>
                        </div>

                        {/* Returns */}
                        <div>
                            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Returns</h3>
                            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{product.shippingInfo}</p>
                        </div>
                    </div>
                </div>

                {/* //infinte banner */}
                <InfiniteMarquee />


                {/* //similar Items */}
                <section>


                    <SimilarProducts />
                    <SubscribeForm />


                </section>
            </main>
        </>
    )
}