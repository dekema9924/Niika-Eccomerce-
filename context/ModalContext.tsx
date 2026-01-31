'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

function createModalContext(modalName: string) {

    const ModalContext = createContext<{
        isOpen: boolean
        setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    } | null>(null)

    const Provider = ({ children }: { children: ReactNode }) => {
        const [isOpen, setIsOpen] = useState(false)
        return <ModalContext.Provider value={{ isOpen, setIsOpen }}>{children}</ModalContext.Provider>
    }

    const useModal = () => {
        const context = useContext(ModalContext)
        if (!context) throw new Error(`useModal must be used within ${modalName}Provider`)
        return context
    }

    return { Provider, useModal }
}

// Usage:
export const { Provider: AccountModalProvider, useModal: useAccountModal } = createModalContext('AccountModal')
export const { Provider: ProfileModalProvider, useModal: useProfileModal } = createModalContext('ProfileModal')
export const { Provider: EditProfileModalProvider, useModal: useEditProfileModal } = createModalContext("EditProfileModal")