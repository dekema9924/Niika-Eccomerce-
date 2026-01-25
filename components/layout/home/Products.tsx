
import Link from 'next/link'
import ProductItem from '../../ui/shopProduct/ProductItem'

function Products() {
    let p = Array.from({ length: 10 }, (_, i) => i + 1)


    return (
        <>
            <div className='flex justify-between my-10'>
                <h1 className='font-bold text-3xl'>Products</h1>
                <Link className='text-xl' href={'/products'}>See all</Link>
            </div>

            {/* Product grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10'>
                {/* Example Product Item */}
                {
                    p.map((item) => {
                        return (
                            <div key={item.toFixed()}>
                                <ProductItem

                                    image={`https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500`}
                                    title={`Product ${item}`}
                                    price={29.99 + item}
                                    discountPrice={item % 2 === 0 ? 19.99 + item : undefined}
                                />
                            </div>
                        )
                    })
                }

            </div>
        </>
    )
}

export default Products