'use client'
import React, { useContext, createContext, useState } from "react";


interface CartContextInterface {
    isCartOpen: boolean
    setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>
}


const CartContext = createContext<CartContextInterface>({
    isCartOpen: false,
    setIsCartOpen: () => { }
})


export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
    return (
        <>
            <CartContext.Provider value={{ isCartOpen, setIsCartOpen }}>
                {children}
            </CartContext.Provider>
        </>
    )
}


export const useCartContext = () => {
    const context = useContext(CartContext)
    if (!context) throw new Error("useCart must be used within a CartProvider")

    return context
}