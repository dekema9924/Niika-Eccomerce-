'use client'

import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useEditProfileModal } from '@/context/ModalContext'
import { authClient } from '@/lib/client/auth.client'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

type EditProfileModalProps = {
    HandleName: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function EditProfileModal({ HandleName }: EditProfileModalProps) {
    const { setIsOpen } = useEditProfileModal()
    // const [userEmail, setUserEmail] = useState<string | undefined>('')
    const { data: session } = authClient.useSession()
    const router = useRouter()


    if (!session?.user?.id) {
        router.push('/auth/sign-in')
        return
    }



    return (
        <>
            <div className='flex items-center justify-between mb-2'>
                <h1 className='text-xl font-semibold'>Edit profile</h1>
                <X onClick={() => setIsOpen(false)} className='cursor-pointer hover:bg-gray-100 rounded p-1' size={20} />
            </div>
            <p className='text-sm text-gray-600 mb-6'>Make changes to your profile here. Click save when you're done.</p>

            <div className='space-y-4'>
                <div>
                    <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>
                        Name
                    </label>
                    <input
                        onChange={HandleName}
                        type='text'
                        id='name'
                        name='name'
                        placeholder='Enter your name'
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black'
                    />
                </div>

                <div>
                    <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
                        Email
                    </label>
                    <input
                        value={session?.user.email}
                        readOnly
                        type='email'
                        id='email'
                        name='email'
                        placeholder='Enter your email'
                        className='w-full outline-none px-3 py-2 border border-gray-300 rounded-md focus:outline-none  '
                    />
                </div>

            </div>
        </>

    )
}
