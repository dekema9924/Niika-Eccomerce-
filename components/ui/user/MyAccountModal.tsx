

import Link from 'next/link'
import { useEditProfileModal } from '@/context/ModalContext'
import { useAccountModal } from '@/context/ModalContext'
import LogoutButton from '../LogoutButton'

export default function MyAccountModal() {
    const { setIsOpen, isOpen } = useEditProfileModal()
    const { setIsOpen: setAccountModal } = useAccountModal()
    return (
        <>
            <div className={`w-66 h-44 shadow-2xl p-2 absolute ${isOpen ? "opacity-0 " : "z-50"} rounded-md text-black top-10 bg-white right-0 `}>
                <h1 className='font-bold border-b border-gray-400 p-2'>My Account</h1>
                <div>
                    <button onClick={() => { setIsOpen(true), setAccountModal(false) }} className='font-bold p-2 cursor-pointer'>Edit Profile</button>
                    <Link onClick={() => setAccountModal(false)} className='font-bold border-b border-gray-400 p-2 block' href={'/myorders'}>View Orders</Link>
                </div>
                <LogoutButton />
            </div>
        </>
    )
}
