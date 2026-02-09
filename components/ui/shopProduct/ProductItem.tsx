
import Image from 'next/image'
import { The_Girl_Next_Door } from 'next/font/google'

type ProductItemProps = {
    image: string
    title: string
    price: number
    discountPrice?: number | null
}

const girl = The_Girl_Next_Door({ subsets: ['latin'], weight: '400' })

export default function ProductItem({ image, title, price, discountPrice }: ProductItemProps) {
    return (
        <>
            <div className='w-full '>
                <Image loading='lazy' src={image} alt={title} width={300} height={300} className="h-90 lg:h-120 w-full object-cover" />
                <h2 className={girl.className + " font-semibold text-lg mt-2"} style={{ fontWeight: 600 }}>{title}</h2>
                <div className="flex items-center gap-2">
                    {discountPrice ? (
                        <>
                            <span className="text-red-500 font-bold">${discountPrice.toFixed(2)}</span>
                            <span className="line-through text-gray-500">${price.toFixed(2)}</span>
                        </>
                    ) : (
                        <span className="font-bold">${price.toFixed(2)}</span>
                    )}


                </div>
            </div>
        </>
    )
}
