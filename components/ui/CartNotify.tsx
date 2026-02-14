'use client'
import { useCart } from "@/context/cartItemContext"
export default function CartNotify() {
    const { cartCount, loading } = useCart()

    // Don't show anything while loading
    if (loading) return null

    // Only show dot when there are items
    if (cartCount === 0) return null

    return (
        <span className="block bg-red-900 w-2 h-2 rounded-full ml-5 absolute" />
    )
}