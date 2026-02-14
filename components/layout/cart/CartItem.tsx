'use client'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useCart } from '@/context/cartItemContext'

export default function CartItem() {
    const { cartItems, deleteItem, loading } = useCart()

    if (loading) {
        return <div className='text-center p-10'>Loading...</div>
    }

    if (cartItems.length === 0) {
        return (
            <div className='text-center p-10 text-gray-500'>
                Your cart is empty
            </div>
        )
    }

    return (
        <div>
            {cartItems.map((items) => (
                <div key={items.id} className='w-11/12 border-b pb-3 my-5 border-gray-400 m-auto flex items-center justify-between'>
                    <div className='flex w-55 gap-3'>
                        <div className='relative'>
                            <Image
                                src={items.product.images[0].url}
                                alt='item_image'
                                width={70}
                                height={70}
                                loading='lazy'
                                className='rounded-2xl h-15 object-cover'
                            />
                            <span
                                onClick={() => deleteItem(items.id)}
                                className='absolute -top-2 bg-red-600 rounded-full cursor-pointer text-white -right-2'
                            >
                                <X className='w-4 h-4' />
                            </span>
                        </div>
                        <p className='text-lg font-semibold leading-5 overflow-x-hidden'>
                            {items.product.name}
                        </p>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <p className='font-semibold'>${items.product.price} USD</p>

                        <div className='bg-black w-22 h-10 text-white flex items-center justify-around text-bold rounded-2xl'>
                            <span>{items.quantity}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}