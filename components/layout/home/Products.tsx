import Link from 'next/link'
import ProductItem from '../../ui/shopProduct/ProductItem'
import { ProductInterface } from '@/types/product';

type ProductsProps = {
    products: ProductInterface[]
    heading: string
}

function Products({ products, heading }: ProductsProps) {
    return (
        <>
            <div className='flex justify-between my-10'>
                <h1 className='font-bold text-3xl'>{heading}</h1>
                <Link className='text-xl' href={'/products'}>See all</Link>
            </div>

            {/* Product grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10'>
                {/* Example Product Item */}
                {
                    products.map((item) => {
                        return (
                            <Link href={`/products/${item.id}`} key={item.id}>
                                <ProductItem
                                    image={item.image}
                                    title={item.name}
                                    price={item.price}
                                    discountPrice={item?.discountPrice}
                                />
                            </Link>
                        )
                    })
                }

            </div>
        </>
    )
}

export default Products