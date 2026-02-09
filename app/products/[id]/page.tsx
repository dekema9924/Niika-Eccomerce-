'use client'
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import InfiniteMarquee from "@/components/ui/InfiniteMarquee"
import SimilarProducts from "@/components/layout/productdetails/SimilarProducts"
import SubscribeForm from "@/components/layout/SubscribeForm"
import axios from "axios"
import { useEffect, useMemo, useState } from "react"
import { ProductDetailsInterface } from "@/types/product"
import { addToCart } from "@/lib/client/cart"
import { LoaderCircle } from "lucide-react"
import toast from "react-hot-toast"
import { useCart } from "@/context/cartItemContext"



export default function ProductDetailsPage() {
    const { id } = useParams()
    const { refreshCart } = useCart()
    const [product, setProductDetails] = useState<ProductDetailsInterface | null>(null)
    const [mainImage, setMainImage] = useState<string | undefined>(product?.image)
    const [quantity, setQuantity] = useState(1)
    const [selectedColor, setSelectedColor] = useState<string>('')
    const [selectedSize, setSelectedSize] = useState<string>('')
    const [isCartloading, setIsCartloading] = useState<boolean>(false)



    //handling add items
    const addQuantity = () => {
        //making sure users cant go over or below product quatity
        if (selectedVariant && quantity > selectedVariant?.quantity - 1) {
            setQuantity(1)
        } else {
            setQuantity(quantity + 1)
        }
    }

    const minusQuantity = () => {
        //making sure users cant go over or below product quatity
        if (selectedVariant && quantity < selectedVariant?.quantity + 1) {
            setQuantity(1)
        } else {
            setQuantity(quantity + 1)

        }
    }






    // func for getiing product details
    async function fetchProductDetails() {
        try {
            const res = await axios.get(`/api/products/${id}`)
            if (res.status === 200) {
                setProductDetails(res.data)
                if (res.data.colors.length > 0) {
                    setSelectedColor(res.data.colors[0])
                }
                if (res.data.sizes?.length > 0) {
                    setSelectedSize(res.data.sizes[0])
                }
            }
        } catch (error) {
            console.error('Error fetching product:', error)
        }
    }

    // When color or size changes, find the matching variant
    const selectedVariant = useMemo(() => {
        if (!product || !selectedColor || !selectedSize) return null

        return product.variants?.find(
            (v) => v.color === selectedColor && v.size === selectedSize
        ) || null
    }, [product, selectedColor, selectedSize])



    //fetch product details 
    useEffect(() => {
        if (id) {
            fetchProductDetails()
        }
    }, [id])



    //chnage display images
    const handleImageCarousel = (id: number) => {
        setMainImage(product?.images[id])
    }


    //addTocart
    const handleAddCart = async () => {
        if (!product || !selectedVariant) return

        try {
            setIsCartloading(true)

            const result = await addToCart({
                productId: product.id,
                quantity,
                variantId: selectedVariant.id
            })

            if (result.success) {
                toast.success(result.message)
                await refreshCart() // ← Refresh cart immediately!

                // Optional: Reset quantity after adding
                setQuantity(1)
            }
        } catch (err: any) {
            toast.error(err.message || "Failed to add to cart")
        } finally {
            setIsCartloading(false)
        }
    }




    if (!product) return <div className="p-4 text-center">loading...</div>



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
                                {product.images?.map((img, index) => (
                                    <div
                                        onClick={() => handleImageCarousel(index)}
                                        key={index}
                                        className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 border-2 border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:border-gray-400 transition"
                                    >
                                        <Image
                                            src={img}
                                            alt={`Product view ${index + 1}`}
                                            width={80}
                                            height={80}
                                            loading="eager"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Main image */}
                            <div className="flex-1 transition-all duration-300 aspect-square bg-[#E5D5C6] rounded-2xl overflow-hidden">
                                <Image
                                    src={mainImage || product.image}
                                    alt={product.name}
                                    loading="eager"
                                    width={600}
                                    height={600}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Promo banner */}
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
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">{product.name}</h1>

                        {/* Pricing */}
                        <div className="flex items-center gap-3 sm:gap-4 mb-2">
                            <span className="text-3xl sm:text-4xl font-bold text-[#FF6B35]">${product.price}</span>
                            {product.discountPrice && (
                                <span className="text-xl sm:text-2xl text-gray-400 line-through">${product.discountPrice}</span>
                            )}
                        </div>
                        <p className="text-red-600 font-medium mb-6 sm:mb-8">
                            {product.isOutOfStock ? 'Out of stock' : 'In stock'}
                        </p>

                        {/* Color selection */}
                        {product.colors && product.colors.length > 0 && (
                            <div className="mb-6">
                                <h3 className="font-semibold mb-3">COLOR</h3>
                                <div className="flex gap-3 flex-wrap">
                                    {product.colors.map((color) => (
                                        <button
                                            onClick={() => setSelectedColor(color)}
                                            key={color}
                                            className={`px-5 sm:px-6 py-2 border-2 rounded-md font-medium transition text-sm sm:text-base border-gray-300 hover:border-gray-400 ${selectedColor === color ? "border-black!" : ""}`}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Size selection */}
                        {product.sizes && product.sizes.length > 0 && (
                            <div className="mb-6 sm:mb-8">
                                <h3 className="font-semibold mb-3">SIZE</h3>
                                <div className="flex gap-2 sm:gap-3 flex-wrap">
                                    {product.sizes.map((size) => (
                                        <button
                                            onClick={() => setSelectedSize(size)}
                                            key={size}
                                            className={`px-4 sm:px-5 py-2 border-2 rounded-md font-medium transition text-sm sm:text-base ${selectedSize === size ? " border-black!" : ""} border-gray-300 hover:border-gray-400`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity and Add to Cart */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8">
                            <div className="flex items-center border-2 border-gray-300 rounded-md w-full sm:w-auto">
                                <button onClick={() => { minusQuantity() }} className="px-4 py-3 hover:bg-gray-100 transition w-11/12 max-w-90">−</button>
                                <input
                                    type="number"
                                    value={quantity}
                                    className="w-11/12 max-w-90 text-center border-x-2 border-gray-300 py-3"
                                    readOnly
                                />
                                <button onClick={() => addQuantity()} className="px-4 py-3 hover:bg-gray-100 transition w-11/12 max-w-90">+</button>
                            </div>
                            <button onClick={() => handleAddCart()} className={`flex-1 bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition cursor-pointer ${!selectedVariant || !product || isCartloading ? "pointer-events-none cursor-none bg-gray-300 text-black!" : ""}`}>
                                {!isCartloading ? "Add to Cart" : <LoaderCircle className="animate-spin mx-auto" />}
                            </button>
                        </div>

                        {/* Delivery info */}
                        {(product.estimatedDelivery || product.deliveryDate) && (
                            <div className="space-y-3 mb-6 sm:mb-8">
                                {product.estimatedDelivery && (
                                    <div className="flex items-center gap-3 text-green-700">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                        </svg>
                                        <span className="font-medium text-sm sm:text-base">Estimated Delivery: {product.estimatedDelivery}</span>
                                    </div>
                                )}
                                {product.deliveryDate && (
                                    <div className="flex items-center gap-3 text-green-700">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span className="font-medium text-sm sm:text-base">Delivery date: {product.deliveryDate}</span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Description */}
                        {product.description && (
                            <div className="mb-6 sm:mb-8">
                                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Description</h3>
                                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{product.description}</p>
                            </div>
                        )}

                        {/* Returns */}
                        {product.shippingInfo && (
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Returns</h3>
                                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{product.shippingInfo}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Infinite banner */}
                <InfiniteMarquee />

                {/* Similar Items */}
                <section>
                    <SimilarProducts />
                    <SubscribeForm />
                </section>
            </main>
        </>
    )
}