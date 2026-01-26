

import { MinusIcon, PlusIcon, X } from 'lucide-react'
import Image from 'next/image'

interface CartItemProps {
    image: string
    title: string
    price: number
    count: number
}

export default function CartItem() {
    return (
        <>
            <div className=' w-11/12 border-b pb-3 border-gray-400 m-auto flex items-center justify-between'>
                <div className='flex w-55 gap-3  '>
                    <div className='relative'>
                        <Image
                            src={"https://images.unsplash.com/photo-1646142444991-6896b6a3b6e7?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                            alt='item_image'
                            width={70}
                            height={70}
                            loading='lazy'
                            className='rounded-2xl object-cover'
                        />
                        <span className='absolute -top-2 bg-red-600 rounded-full cursor-pointer text-white -right-2'>
                            <X />
                        </span>
                    </div>
                    <p className='text-lg font-semibold leading-5 overflow-x-hidden'>Futuristic Hooded Jacket</p>
                </div>
                <div className='flex flex-col gap-4'>
                    <p className='font-semibold'>$120 USD</p>

                    {/* item count */}
                    <div className='bg-black w-22 h-10 text-white flex items-center justify-around text-bold rounded-2xl  '>
                        <span><MinusIcon /></span>
                        <span>3</span>
                        <span><PlusIcon /></span>
                    </div>
                </div>
            </div>
        </>
    )
}
