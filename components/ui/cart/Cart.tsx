
import { X } from 'lucide-react'
import React from 'react'
import CartTotal from './CartTotal';
import CartItem from './CartItem';

type Props = {
    isCartOpen: boolean;
    setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Cart({ isCartOpen, setIsCartOpen }: Props) {
    return (
        <>
            <aside className={`fixed top-0 ${isCartOpen ? 'right-0' : '-right-full'}  h-screen bg-white text-black z-50 w-full sm:w-96 shadow-lg transition-all duration-500 ease-in-out overflow-y-auto`}>
                <div className='flex p-5 pt-10 justify-between items-center'>
                    <div className='flex gap-2 items-center'>
                        <h1 className='text-2xl font-bold'>Your Cart</h1>
                        <span className='bg-gray-200 rounded-full w-10 h-10 text-lg flex items-center justify-center font-bold'>0</span>
                    </div>

                    <button onClick={() => setIsCartOpen(false)} className='flex w-10 h-10 rounded-lg bg-gray-200 items-center cursor-pointer justify-center hover:bg-gray-300 transition-colors'>
                        <X />
                    </button>
                </div>

                <hr className='w-full border-t h-1 border-gray-300 my-10' />

                {/* //show cart items here */}
                <CartItem />

                <CartTotal />
            </aside>


        </>
    )
}
