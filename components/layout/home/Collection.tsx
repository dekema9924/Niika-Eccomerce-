

import collection_1 from '@/public/images/home/collection/collection1.png'
import collection_2 from '@/public/images/home/collection/collection2.png'
import collection_3 from '@/public/images/home/collection/collection3.png'
import collection_4 from '@/public/images/home/collection/collection4.png'

import Image from 'next/image'


export default function Collection() {
    const Images = [collection_1, collection_2, collection_3, collection_4];
    return (
        <>
            <section className="w-full flex">
                {
                    Images.map((img, index) => (
                        <div key={index} className=" w-full m-auto mb-5">
                            <Image loading="lazy" width={400} height={400} src={img} alt={`collection image ${index + 1}`} className="w-full h-170 object-cover" />
                        </div>
                    ))
                }
            </section>
        </>
    )
}
