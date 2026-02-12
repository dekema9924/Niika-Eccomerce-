
'use client'
import { isCartEmpty } from '@/lib/server/cart'
import { useEffect, useState } from 'react'

export default function CartNotify() {
    const [isEmpty, setIsEmpty] = useState(false)
    const [loading, setLoading] = useState<boolean>(true)



    useEffect(() => {
        isCartEmpty().then((res) => {
            if (res) {
                setIsEmpty(res?.isCart)
                setLoading(true)
            }
        })

    }, [])

    if (!loading) return null





    return (
        <span className={`block  ${!isEmpty ? "hidden" : "block"} bg-red-900 w-2 h-2 rounded-full ml-5 absolute `}></span>

    )
}
