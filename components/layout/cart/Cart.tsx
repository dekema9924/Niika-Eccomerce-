'use client'
import { X } from 'lucide-react'
import CartTotal from './CartTotal'
import CartItem from './CartItem'
import { useCart } from '@/context/cartItemContext'

type Props = {
    isCartOpen: boolean
    setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Cart({ isCartOpen, setIsCartOpen }: Props) {
    const { cartItems, loading, cartCount } = useCart()

    return (
        <aside className={`fixed top-0 ${isCartOpen ? 'right-0' : '-right-full'} h-screen bg-white text-black z-50 w-full sm:w-96 shadow-lg transition-all duration-500 ease-in-out flex flex-col`}>
            <div className='shrink-0 p-5 pt-10'>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-2 items-center'>
                        <h1 className='text-2xl font-bold'>Your Cart</h1>
                        <span className='bg-gray-200 rounded-full w-10 h-10 text-lg flex items-center justify-center font-bold'>
                            {cartCount}
                        </span>
                    </div>

                    <button onClick={() => setIsCartOpen(false)} className='flex w-10 h-10 shrink-0 rounded-lg bg-gray-200 items-center cursor-pointer justify-center hover:bg-gray-300 transition-colors'>
                        <X />
                    </button>
                </div>
                <hr className='w-full border-t border-gray-300 mt-6' />
            </div>

            <div className='flex-1 overflow-y-auto overflow-x-hidden px-3'>
                {loading ? (
                    <div className='text-center p-5'>Loading...</div>
                ) : (
                    <CartItem />
                )}
            </div>

            <div className='shrink-0 border-t border-gray-300'>
                <CartTotal cartItems={cartItems} loading={loading} />
            </div>
        </aside>
    )
}