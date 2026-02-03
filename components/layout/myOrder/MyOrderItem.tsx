'use client'
import Image from 'next/image'
import { Trash2 } from 'lucide-react'

interface ItemProps {
    image: string
    name: string
    category: string
    size: string
    quantity: number
    price: number
    estimatedDelivery: string
    onRemove?: () => void
    onQuantityChange?: (newQuantity: number) => void
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
}: ItemProps) {
    return (
        <div className="flex items-center gap-4  border-b border-gray-200">
            {/* Product Image */}
            <div className="relative w-32 h-32 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                <Image
                    src={image}
                    alt={name}
                    className="object-contain p-2"
                    width={100}
                    height={100}
                />
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
                <p className="text-sm text-orange-600 font-medium mb-1">
                    Estimated arrival {estimatedDelivery}
                </p>
                <h3 className="text-base font-medium text-gray-900 mb-1">
                    {name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                    {category}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <span>Size</span>
                        <span className="font-medium">{size}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>Quantity</span>
                        <select
                            value={quantity}
                            onChange={(e) => onQuantityChange?.(Number(e.target.value))}
                            className="border border-gray-300 rounded px-2 py-1 font-medium"
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Price and Remove */}
            <div className="flex flex-col items-end gap-4">
                <p className="text-base font-medium text-gray-900">
                    ${price.toFixed(2)}
                </p>
                <button
                    onClick={onRemove}
                    className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1"
                >
                    <Trash2 size={16} />
                    Cancel Order
                </button>
            </div>
        </div>
    )
}