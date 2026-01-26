import React from 'react'
import Image from 'next/image'
import cancel_order from '@/public/images/order_cancellation.png'
import { The_Girl_Next_Door } from 'next/font/google'
import Faq from '@/components/layout/Faq'

const girlNextDoor = The_Girl_Next_Door({ subsets: ['latin'], weight: '400' })



export default function Cancellationpage() {
    return (
        <>
            <div className='w-full bg-black text-white h-22 text-3xl flex items-center pl-7'>
                <h1>ORDER CANCELLATION</h1>
            </div>


            <div className={`p-5 w-10/12 m-auto`}>
                <Image
                    src={cancel_order}
                    width={2400}
                    height={2400}
                    alt='cancel_order'
                    className='h-120 w-full  m-auto object-cover xl:object-[center_20%]'
                />
                <h1 className={`text-xl md:text-3xl font-semibold my-7 ${girlNextDoor.className}`} style={{ fontWeight: 700 }}>Can I cancel my Niika Order?</h1>

                <p>Yes, you can cancel your Niika order within 24 hours of placing it. After this period, cancellation is not possible. If you need to cancel an order, please contact our customer support team immediately.</p>

                <p className={`text-lg my-4 `} >To cancel an Order:</p>
                <ul className='list-disc ml-5 mb-10'>
                    <li className='md:text-lg my-2'>Log in to your Niika account and navigate to the "My Orders" section.</li>
                    <li className='md:text-lg my-2'>Select the order you wish to cancel and click on the "Cancel Order" button.</li>
                    <li className='md:text-lg my-2'>Confirm the cancellation when prompted.</li>

                </ul>

                <Faq faqItems={[
                    {
                        id: 1,
                        question: 'How do I cancel my order?',
                        answer: 'To cancel your order, log in to your Niika account, go to the "My Orders" section, select the order you want to cancel, and click on the "Cancel Order" button. Confirm the cancellation when prompted.'
                    },
                    {
                        id: 2,
                        question: 'Can I cancel my order after 24 hours?',
                        answer: 'No, orders can only be canceled within 24 hours of placing them. After this period, cancellation is not possible.'
                    },
                    {
                        id: 3,
                        question: 'Will I receive a refund for my canceled order?',
                        answer: 'Yes, if you cancel your order within the allowed time frame, you will receive a full refund to your original payment method.'
                    },
                    {
                        id: 4,
                        question: 'How long does it take to process a cancellation?',
                        answer: 'Cancellations are typically processed within 3-5 business days. The refund may take additional time to reflect in your account, depending on your bank or payment provider.'
                    },
                ]} />

                <p className='my-10 text-lg'>
                    If you have any further questions or need assistance with canceling your order, please contact our customer support team at 123-456-7890 or email help@niika.com
                </p>

            </div>
        </>
    )
}
