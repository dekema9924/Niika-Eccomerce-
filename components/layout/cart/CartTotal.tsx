'use client'

type Props = {
    cartItems: any[]
    loading: boolean
}

export default function CartTotal({ cartItems, loading }: Props) {
    const totalAmt = cartItems.reduce((total, item) => {
        const itemTotal = item.product.price * item.quantity
        return total + itemTotal
    }, 0)

    return (
        <div className='p-5 bg-black text-white'>
            <div className='flex items-center justify-between mb-4'>
                <h1 className='text-2xl font-bold'>Subtotal</h1>
                <p className='font-bold text-xl'>
                    {loading ? '...' : `$${totalAmt.toFixed(2)}`}
                </p>
            </div>

            <button className='w-full h-12 rounded-md bg-white text-black hover:bg-gray-800 hover:text-white transition-colors font-semibold'>
                Checkout
            </button>
        </div>
    )
}