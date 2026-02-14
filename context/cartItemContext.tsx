'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getCartItems, deleteCartItem } from '@/lib/server/cart'
import toast from 'react-hot-toast'

type CartItem = any

type CartContextType = {
    cartItems: CartItem[]
    loading: boolean
    refreshCart: () => Promise<void>
    deleteItem: (cartItemId: string) => Promise<void>
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

    const deleteItem = async (cartItemId: string) => {
        // Save original for rollback
        const originalItems = cartItems

        //  Optimistic update - remove item immediately
        setCartItems(cartItems.filter((item) => item.id !== cartItemId))

        //  Call server action
        const res = await deleteCartItem(cartItemId)

        if (res?.success) {
            toast.success("Item deleted")
        } else {
            toast.error(res?.message || "Something went wrong")
            //  Rollback on error
            setCartItems(originalItems)
        }
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
            deleteItem,
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