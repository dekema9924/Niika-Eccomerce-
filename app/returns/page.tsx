

import Image from 'next/image'
import returnGirl from '@/public/images/return_girl.png'
import Faq from '@/components/layout/Faq'
import { The_Girl_Next_Door } from 'next/font/google'

const girlNextDoor = The_Girl_Next_Door({ subsets: ['latin'], weight: '400' })


export default function Returnpage() {
    const faqItems = [
        {
            id: 1,
            question: "How do I initiate a return?",
            answer: "You can initiate a return by logging into your account on our website, navigating to the 'Orders' section, and selecting the item you wish to return. Follow the prompts to complete the return request.",
        },
        {
            id: 2,
            question: "Are there any items that cannot be returned?",
            answer: "Yes, certain items such as perishable goods, personalized products, and intimate apparel cannot be returned for hygiene reasons. Please refer to our full return policy for a complete list of non-returnable items.",
        },
        {
            id: 3,
            question: "How long does it take to process a return?",
            answer: "Once we receive your returned item, it typically takes 5-7 business days to process the return and issue a refund. You will receive a confirmation email once the return has been processed.",
        },
        {
            id: 4,
            question: "Can I exchange an item instead of returning it?",
            answer: "Yes, we offer exchanges for items of the same value. To initiate an exchange, please follow the same process as a return and select the exchange option during the return request.",
        },
    ];


    return (
        <>

            <div className='w-full bg-black text-white h-22 text-3xl flex items-center pl-7'>
                <h1>Returns Policy</h1>
            </div>

            <div className={`p-5 w-10/12 m-auto`}>
                <Image
                    src={returnGirl}
                    width={1400}
                    height={1400}
                    alt='return_girl'
                    className='h-120 w-full  m-auto object-cover'
                />


                <h1 className={`text-xl md:text-3xl font-semibold my-7 ${girlNextDoor.className}`} style={{ fontWeight: 700 }}>What are our return policies?</h1>
                <p className={` md:text-lg`}>Our return policy allows customers to return items within 30 days of purchase, provided the items are in their original condition and packaging. Returns must be initiated through our website or customer service. Refunds will be processed to the original payment method within 7-10 business days after we receive the returned item.</p>

                <div className='my-10'>
                    <Faq
                        faqItems={faqItems} />
                </div>

                <h1 className={`text-3xl my-4 ${girlNextDoor.className}`} style={{ fontWeight: 700 }}>Price Exchanges</h1>
                <p className='text-lg md:text-xl'>If you find a lower price on an identical item within 14 days of your purchase, we offer price matching. Please contact our customer service with the details of the lower price, and we will adjust your purchase price accordingly. Price matches are subject to verification and may not apply to clearance or promotional items.</p>

                <hr className='w-full  border-t my-10 border-gray-300' />

                <div className="flex flex-wrap justify-start gap-4 p-4">
                    {[
                        {
                            id: 1,
                            type: "Work Days",
                            details: [
                                "Monday - Friday: 9am - 9pm ET",
                                "Saturday & Sunday: 10am - 7pm ET",
                            ],
                        },
                        {
                            id: 2,
                            type: "Email",
                            details: [
                                "We strive to answer emails within 48 hours",
                                "info@mail.com",
                            ],
                        },
                        {
                            id: 3,
                            type: "Phone",
                            details: [
                                "Online Inquiries | 123-456-7890",
                                "Store Inquiries | 123-456-7890",
                            ],
                        },
                    ].map((contact) => (
                        <div
                            key={contact.id}
                            className="bg-black text-white p-4 flex flex-col justify-center
                 w-full sm:w-5/12 lg:w-1/4 min-h-40 rounded"
                        >
                            <h2 className="font-semibold text-lg mb-2">{contact.type}</h2>
                            {contact.details.map((detail, index) => (
                                <p key={index} className="text-sm">{detail}</p>
                            ))}
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}
