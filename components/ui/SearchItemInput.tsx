
'use client'
import { SearchIcon } from 'lucide-react'
import { useSearchContext } from '@/context/SearchContext'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { searchProduct } from '@/lib/server/Product'
import { useDebounce } from '@/hooks/useDebounce'


export default function SearchItemInput() {
    const { isSearchOpen, setIsSearchOpen } = useSearchContext()
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)


    const debouncedQuery = useDebounce(query, 100) // Wait 100ms after typing stops

    useEffect(() => {
        if (isSearchOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        // Cleanup when component unmounts
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isSearchOpen]);
    //search
    useEffect(() => {
        const handleSearch = async () => {
            if (!debouncedQuery.trim()) {
                setResults([])
                return
            }

            setIsLoading(true)
            try {
                const products = await searchProduct(debouncedQuery)
                setResults(products)
            } catch (error) {
                console.error('Search failed:', error)
                setResults([])
            } finally {
                setIsLoading(false)
            }
        }

        handleSearch()
    }, [debouncedQuery])

    return (
        <>            {isSearchOpen && (
            <form className='flex flex-col z-50 w-11/12  p-3 md:w-6/12 max-w-120 absolute top-50 left-1/2 -translate-x-1/2 -translate-y-1/2 ' action="">
                <div className='flex items-center relative w-full'>
                    <SearchIcon className='absolute left-5 md:left-2' />
                    <input onChange={(e) => setQuery(e.target.value)}
                        className={`w-full h-12  bg-white outline-none  pl-14 ${results.length > 0 ? "rounded-t-2xl" : "rounded-2xl"}`} type="text" name="item" placeholder='Search...' />
                </div>

                <div className={` w-full  bg-white overflow-y-scroll  rounded-b-2xl ${results.length > 0 ? "h-66" : "H-0 overflow-hidden"}`}>
                    {
                        !isLoading && results.length > 0 && (
                            <>
                                {results.map((res) => {
                                    return (
                                        <>
                                            <div key={res.id} className='p-2'>
                                                <Link onClick={() => setIsSearchOpen(false)} className=' flex my-2 flex-col h-12 p-2 hover:bg-gray-300 w-full font-semibold' href={`/products/${res.id}`}>
                                                    {res.name}
                                                    <span className='block text-xs text-gray-400'>/{res.category.slug}</span>
                                                </Link>

                                            </div>
                                        </>
                                    )
                                })}
                            </>
                        )
                    }

                </div>

            </form>
        )}
        </>
    )
}
