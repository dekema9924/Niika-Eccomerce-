
'use client'
import { useEditProfileModal } from '@/context/ModalContext'
import UploadAvatarInput from './UploadAvatarInput'

export default function EditProfileClient() {
    const { isOpen } = useEditProfileModal()

    if (!isOpen) return

    return (
        <>
            <UploadAvatarInput />
        </>
    )
}
