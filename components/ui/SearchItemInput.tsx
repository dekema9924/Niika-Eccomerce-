
'use client'
import { SearchIcon } from 'lucide-react'
import { useState } from 'react'
import { useSearchContext } from '@/context/SearchContext'

export default function SearchItemInput() {
    const { isSearchOpen, setIsSearchOpen } = useSearchContext()
    return (
        <>
            {isSearchOpen && (
                <form className='flex z-50 gap-3 p-3 w-6/12 max-w-120 absolute top-50 left-1/2 -translate-x-1/2 -translate-y-1/2 ' action="">
                    <div className='flex items-center relative w-full'>
                        <SearchIcon className='absolute left-2' />
                        <input className='w-full h-12 outline-neutral-50 bg-white  rounded-2xl pl-9' type="text" name="item" placeholder='Search...' />
                    </div>

                </form>
            )}
        </>
    )
}
