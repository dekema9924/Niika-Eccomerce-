
'use client'
import { useEditProfileModal } from '@/context/ModalContext'
import EditProfileModal from './EditProfileModal'

export default function EditProfileClient() {
    const { isOpen } = useEditProfileModal()

    if (!isOpen) return

    return (
        <>
            <EditProfileModal />
        </>
    )
}
