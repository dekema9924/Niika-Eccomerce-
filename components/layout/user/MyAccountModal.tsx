
'use client'
import Link from 'next/link'
import { useEditProfileModal } from '@/context/ModalContext'
import { useAccountModal } from '@/context/ModalContext'
import LogoutButton from '../../ui/LogoutButton'
import toast from 'react-hot-toast'
import { redirect } from 'next/navigation'
import { authClient } from '@/lib/client/auth.client'

export default function MyAccountModal() {
    const { setIsOpen: setIsEditProfileOpen, isOpen: IsEditProfileOpen } = useEditProfileModal()
    const { setIsOpen: setAccountModal } = useAccountModal()
    const { data: session } = authClient.useSession()


    const handleEditProfile = () => {
        if (!session?.user.id) {
            toast.error("unAuthorized. Pls log In")
            redirect("/auth/login")
        }

        if (!session.user.emailVerified) {
            toast.error("Please verify your email to edit your profile")
            setAccountModal(false)
            redirect("/auth/verify-email")
        }

        setAccountModal(false)
        setIsEditProfileOpen(true)
    }

    return (
        <>
            <div className={`w-66 h-44 shadow-2xl p-2 absolute ${IsEditProfileOpen ? "opacity-0 " : "z-50"} rounded-md text-black top-10 bg-white right-0 `}>
                <h1 className='font-bold border-b border-gray-400 p-2'>My Account</h1>
                <div>
                    <button onClick={() => handleEditProfile()} className='font-bold p-2 cursor-pointer'>Edit Profile</button>
                    <Link onClick={() => setAccountModal(false)} className='font-bold border-b border-gray-400 p-2 block' href={'/myorders'}>View Orders</Link>
                </div>
                <LogoutButton />
            </div>
        </>
    )
}
