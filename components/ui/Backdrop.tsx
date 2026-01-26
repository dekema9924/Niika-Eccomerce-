'use client'
import { useCartContext } from '@/context/CartContext'
import { useSearchContext } from '@/context/SearchContext'

export default function Backdrop() {
    const { isCartOpen, setIsCartOpen } = useCartContext()
    const { isSearchOpen, setIsSearchOpen } = useSearchContext()


    return (
        <>
            {(isCartOpen || isSearchOpen) && (
                <div
                    className="fixed inset-0 bg-black/70 z-40 transition-opacity duration-500"
                    onClick={() => {
                        setIsCartOpen(false)
                        setIsSearchOpen(false)
                    }}
                />
            )}

        </>
    )
}
