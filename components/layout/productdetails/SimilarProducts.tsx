
import Products from '../home/Products'
import { fakeProductsData } from '@/app/helpers/fakeProductData'

export default function SimilarProducts() {

    return (

        <>
            <Products heading='Maybe You Like' products={fakeProductsData} />
        </>




    )
}

