

import Link from 'next/link'
import { useEditProfileModal } from '@/context/ModalContext'
import LogoutButton from '../LogoutButton'

export default function MyAccountModal() {
    const { setIsOpen, isOpen } = useEditProfileModal()
    return (
        <>
            <div className={`w-66 h-44 shadow-2xl p-2 absolute ${isOpen ? "opacity-0 " : "z-50"} rounded-md top-10 bg-white right-0 `}>
                <h1 className='font-bold border-b border-gray-400 p-2'>My Account</h1>
                <div>
                    <button onClick={() => setIsOpen(true)} className='font-bold p-2 cursor-pointer'>Edit Profile</button>
                    <Link className='font-bold border-b border-gray-400 p-2 block' href={'/orders'}>View Orders</Link>
                </div>
                <LogoutButton />
            </div>
        </>
    )
}
