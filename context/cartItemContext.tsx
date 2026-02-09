'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getCartItems } from '@/lib/client/cart'

type CartItem = any

type CartContextType = {
    cartItems: CartItem[]
    loading: boolean
    refreshCart: () => Promise<void>
    cartCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [loading, setLoading] = useState(true)

    const fetchCart = async () => {
        setLoading(true)
        const data = await getCartItems()
        if (!data.error) {
            setCartItems(data.items || [])
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchCart()
    }, [])

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

    return (
        <CartContext.Provider value={{
            cartItems,
            loading,
            refreshCart: fetchCart,
            cartCount
        }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within CartProvider')
    }
    return context
}