'use client'

import { X } from 'lucide-react'
import { useEditProfileModal } from '@/context/ModalContext'

export default function EditProfileModal() {
    const { setIsOpen } = useEditProfileModal()

    return (
        <div className='w-96 p-6 left-1/2 -translate-x-1/2 top-80 -translate-y-1/2 absolute  bg-white z-50 rounded-md shadow-lg'>
            <div className='flex items-center justify-between mb-2'>
                <h1 className='text-xl font-semibold'>Edit profile</h1>
                <X onClick={() => setIsOpen(false)} className='cursor-pointer hover:bg-gray-100 rounded p-1' size={20} />
            </div>
            <p className='text-sm text-gray-600 mb-6'>Make changes to your profile here. Click save when you're done.</p>

            <form className='space-y-4'>
                <div>
                    <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>
                        Name
                    </label>
                    <input
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
                        type='email'
                        id='email'
                        name='email'
                        placeholder='Enter your email'
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black'
                    />
                </div>



                <div className='flex justify-end gap-3 pt-2'>
                    <button
                        type='button'
                        className='px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50'
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        className='px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-gray-800'
                    >
                        Save changes
                    </button>
                </div>
            </form>
        </div>
    )
}
