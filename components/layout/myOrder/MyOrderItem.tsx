import Image from 'next/image'
import { Trash2 } from 'lucide-react'

interface MyOrderItemProps {
    image: string
    name: string
    category: string
    size: string
    quantity: number
    price: number
    estimatedDelivery: string
    onRemove: () => void
    onQuantityChange: (qty: number) => void
}

export default function MyOrderItem({
    image,
    name,
    category,
    size,
    quantity,
    price,
    estimatedDelivery,
    onRemove,
    onQuantityChange
}: MyOrderItemProps) {
    return (
        <div className='border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow'>
            <div className='flex flex-col sm:flex-row gap-4 sm:gap-6'>
                {/* Product Image */}
                <div className='shrink-0'>
                    <div className='relative w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-lg overflow-hidden'>
                        <Image
                            src={image}
                            alt={name}
                            fill
                            className='object-cover'
                        />
                    </div>
                </div>

                {/* Product Details */}
                <div className='flex-1 flex flex-col sm:flex-row justify-between gap-4'>
                    {/* Left Section - Product Info */}
                    <div className='flex-1'>
                        <h3 className='font-bold text-base sm:text-lg text-gray-900 mb-1'>
                            {name}
                        </h3>
                        <p className='text-sm text-gray-600 mb-3'>{category}</p>

                        <div className='flex flex-wrap gap-4 text-sm text-gray-600'>
                            <div>
                                <span className='font-medium'>Size:</span> {size}
                            </div>
                            <div className='flex items-center gap-2'>
                                <span className='font-medium'>Quantity:</span>
                                <div className='flex items-center border border-gray-300 rounded'>
                                    <button
                                        onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                                        className='px-2 py-1 hover:bg-gray-100'
                                    >
                                        -
                                    </button>
                                    <span className='px-3 py-1 border-x border-gray-300'>
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => onQuantityChange(quantity + 1)}
                                        className='px-2 py-1 hover:bg-gray-100'
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className='mt-3 text-sm'>
                            <span className='text-orange-600 font-medium'>Estimated arrival:</span>
                            <span className='ml-2 text-gray-900'>{estimatedDelivery}</span>
                        </div>
                    </div>

                    {/* Right Section - Price & Actions */}
                    <div className='flex sm:flex-col justify-between sm:justify-start items-start sm:items-end gap-4'>
                        <div className='text-right'>
                            <p className='text-xl sm:text-2xl font-bold text-gray-900'>
                                ${price.toFixed(2)}
                            </p>
                        </div>

                        <div className='flex sm:flex-col gap-2'>
                            <button
                                onClick={onRemove}
                                className='flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium'
                            >
                                <Trash2 className='w-4 h-4' />
                                <span>Cancel Order</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}