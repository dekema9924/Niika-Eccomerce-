

import Link from 'next/link'
import React from 'react'

export default function MyAccountModal() {
    return (
        <>
            <div className='w-66 h-44 shadow-2xl p-2 absolute z-50 rounded-md top-10 bg-white right-0 '>
                <h1 className='font-bold border-b border-gray-400 p-2'>My Account</h1>
                <div>
                    <p className='font-bold p-2'>Edit Profile</p>
                    <Link className='font-bold border-b border-gray-400 p-2 block' href={'/orders'}>View Orders</Link>
                </div>
                <button className='font-bold p-2'>Logout</button>
            </div>
        </>
    )
}
