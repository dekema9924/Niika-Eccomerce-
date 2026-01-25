

'use client'
import React, { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react';

type FaqItem = {
    id: number;
    question: string;
    answer: string;
}


export default function Faq({ faqItems }: { faqItems: FaqItem[] }) {



    const [expandedItem, setExpandedItem] = useState<number | null>(null);

    function toggleItem(id: number) {
        if (expandedItem === id) {
            setExpandedItem(null);
        } else {
            setExpandedItem(id);
        }
    }

    return (
        <>
            <h1 className='font-bold text-xl'>FAQ's</h1>

            <div>
                {
                    faqItems.map((item) => (
                        <div onClick={() => toggleItem(item.id)} key={item.id} className={`h-12 hover:translate-x-5 overflow-hidden transition-all duration-500 ${expandedItem === item.id ? 'h-fit' : ''}`}>
                            <h2 className='font-semibold mt-5 text-xl flex gap-1 items-center'>{item.id}. {item.question} {expandedItem === item.id ? <ChevronUp /> : <ChevronDown />}</h2>
                            <p className='md:text-lg'>{item.answer}</p>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

