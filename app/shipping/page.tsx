

import React from 'react'
import shippingGirl from '@/public/images/shipping_girl.png'
import Image from 'next/image'
import { The_Girl_Next_Door } from 'next/font/google'
import TrustSection from '@/components/layout/home/TrustSection'

const girlNextDoor = The_Girl_Next_Door({ subsets: ['latin'], weight: '400' })




export default function page() {
    return (
        <>
            <div className='w-full bg-black text-white h-22 text-3xl flex items-center pl-7'>
                <h1>Shipping Policy</h1>
            </div>


            <div className={`p-5 w-10/12 m-auto`}>
                <Image
                    src={shippingGirl}
                    width={1400}
                    height={1400}
                    alt='shipping_girl'
                    className='h-120 w-full  m-auto object-cover'
                />
                <h1 className={`text-xl md:text-3xl font-semibold my-7 ${girlNextDoor.className}`} style={{ fontWeight: 700 }}>Standard Shipping</h1>

                <ul className='list-disc ml-5 mb-10'>
                    <li className='md:text-lg my-2'>We offer standard shipping on all orders within the continental United States. Orders are typically processed within 1-2 business days and shipped via USPS or UPS.</li>
                    <li className='md:text-lg my-2'>Shipping costs are calculated at checkout based on the weight and dimensions of the items in your order, as well as the shipping destination.</li>
                    <li className='md:text-lg my-2'>Estimated delivery times for standard shipping are 3-7 business days, depending on your location.</li>
                    <li className='md:text-lg my-2'>We also offer expedited shipping options for an additional fee. Expedited orders are processed within 1 business day and typically arrive within 1-3 business days.</li>
                    <li className='md:text-lg my-2'>Please note that delivery times may be affected by factors outside of our control, such as weather conditions or carrier delays.</li>
                </ul>

                <h1 className={`text-xl md:text-3xl font-semibold my-7 ${girlNextDoor.className}`} style={{ fontWeight: 700 }}>Express Shipping</h1>
                <ul className='list-disc ml-5 mb-10'>
                    <li className='md:text-lg my-2'>Express shipping is available for customers who need their orders delivered quickly. This option is ideal for urgent purchases or last-minute gifts.</li>
                    <li className='md:text-lg my-2'>Orders placed with express shipping are prioritized in our fulfillment process to ensure timely delivery.</li>
                </ul>

                <h1 className={`text-xl md:text-3xl font-semibold my-7 ${girlNextDoor.className}`} style={{ fontWeight: 700 }}>Delivery Dates</h1>
                <p>Delivery dates are estimates and may vary based on the shipping method selected and the destination address. For express shipping, delivery is typically within 1-3 business days. Standard shipping usually takes 3-7 business days.International orders may take longer, ranging from 7-21 business days depending on the destination and customs clearance times. Once your order is shipped, we’ll provide you with a tracking number so you can monitor its progress in real-time. Please note that holidays, natural disasters, or unforeseen delays may affect delivery times, but we always strive to keep you informed every step of the way.</p>

                <hr className='w-full  border-t my-10 border-gray-300' />
            </div>


            <TrustSection />








        </>
    )
}
