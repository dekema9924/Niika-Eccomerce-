

import React from 'react'
import { Container, Package } from 'lucide-react';
import { Headset } from 'lucide-react';
import { Banknote } from 'lucide-react';
import { UserLock } from 'lucide-react';







export default function TrustSection() {

    const trustItemsArray = [
        {
            logo: <Package className="w-6 h-6" />,
            title: "Ship It Free",
            description: "Enjoy free shipping on all orders.",

        },
        {
            logo: <Headset className="w-6 h-6" />,
            title: "24/7 Support",
            description: "We're here to help anytime.",
        },
        {
            logo: <Banknote className="w-6 h-6" />,
            title: "Money Back Guarantee",
            description: "30-day money back guarantee.",
        },
        {
            logo: <UserLock className="w-6 h-6" />,
            title: "Secure Payment",
            description: "Your payment information is safe with us.",
        }
    ]


    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  w-full  p-6 '>
            {
                trustItemsArray.map((item, index) => (

                    <div key={index} className="w-100 p-3 h-44  ">
                        <div className="text-blue-500">
                            {item.logo}
                        </div>
                        <div>
                            <h3 className="font-semibold text-2xl">{item.title}</h3>
                            <p className="text-gray-600 text-lg">{item.description}</p>
                        </div>
                    </div>

                ))
            }

        </div>
    )
}
