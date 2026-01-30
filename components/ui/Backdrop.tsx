'use client'
import { useCartContext } from '@/context/CartContext'
import { useSearchContext } from '@/context/SearchContext'
import { useAccountModal } from '@/context/ModalContext'

export default function Backdrop() {
    const { isCartOpen, setIsCartOpen } = useCartContext()
    const { isSearchOpen, setIsSearchOpen } = useSearchContext()
    const { isOpen, setIsOpen } = useAccountModal()


    return (
        <>
            {(isCartOpen || isSearchOpen || isOpen) && (
                <div
                    className="fixed inset-0 bg-black/70 z-40 transition-opacity duration-500"
                    onClick={() => {
                        setIsCartOpen(false)
                        setIsSearchOpen(false)
                        setIsOpen(false)
                    }}
                />
            )}

        </>
    )
}
