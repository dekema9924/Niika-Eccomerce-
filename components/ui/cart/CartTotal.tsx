

import React from 'react'

export default function CartTotal() {
    return (
        <>
            <div className='absolute bottom-10 w-full'>
                <hr className='w-full border-t h-1 border-gray-300 my-10' />

                <div className='flex items-center justify-between p-5'>
                    <h1 className='text-2xl font-bold'>Subtotal</h1>
                    <p className='font-bold text-xl'>$0</p>
                </div>
                <button className='w-11/12 block m-auto h-12 rounded-md bg-gray-300'>Checkout</button>

            </div>
        </>
    )
}
