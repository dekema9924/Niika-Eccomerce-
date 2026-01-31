'use client'
import { useCartContext } from '@/context/CartContext'
import { useSearchContext } from '@/context/SearchContext'
import { useAccountModal, useEditProfileModal, useProfileModal } from '@/context/ModalContext'

export default function Backdrop() {
    const { isCartOpen, setIsCartOpen } = useCartContext()
    const { isSearchOpen, setIsSearchOpen } = useSearchContext()
    const { isOpen: isAccountOpen, setIsOpen: setAccountOpen } = useAccountModal()
    const { isOpen: isEditProfileOpen, setIsOpen: setEditProfileOpen } = useEditProfileModal()
    const { isOpen: isProfileOpen, setIsOpen: setProfileOpen } = useProfileModal()


    return (
        <>
            {(isCartOpen || isSearchOpen || isAccountOpen || isEditProfileOpen || isProfileOpen) && (
                <div
                    className="fixed inset-0 bg-black/70 z-40 transition-opacity duration-500"
                    onClick={() => {
                        setIsCartOpen(false)
                        setIsSearchOpen(false)
                        setAccountOpen(false)
                        setEditProfileOpen(false)
                        setProfileOpen(false)
                    }}
                />
            )}

        </>
    )
}
