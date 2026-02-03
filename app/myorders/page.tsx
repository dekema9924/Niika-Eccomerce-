'use client'
import Favorites from '@/components/layout/myOrder/Favorites'
import MyOrderItem from '@/components/layout/myOrder/MyOrderItem'
import PaymentMethods from '@/components/layout/myOrder/PaymentMethods'
import UserAvatarClient from '@/components/layout/user/UserAvatarClient'
import { useState } from 'react'


function MyOrderspage() {
    const [activeId, setActiveId] = useState<number>(1)

    return (
        <div className='w-11/12 mt-14 md:max-w-3xl mx-auto px-6 py-8 '>

            {/* User Profile Section */}
            <div className='flex items-center gap-4 mb-8'>
                <UserAvatarClient />
                <div>
                    <p className='font-bold text-lg'>Lamine Yamal</p>
                    <span className='text-sm text-gray-600'>yamal@user.com</span>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className={`mb-12 `}>
                <ul className='flex items-center gap-12 '>

                    {[
                        {
                            tab: "my orders",
                            id: 1,
                        },
                        {
                            tab: "favorites",
                            id: 2
                        },
                        {
                            tab: "payment methods",
                            id: 3
                        }
                    ].map((t) => {
                        return (
                            <>
                                <li key={t.id} onClick={() => setActiveId(t.id)} className={`pb-4 capitalize  text-gray-600 hover:text-black ${activeId === t.id ? "border-b border-gray-500" : ""} cursor-pointer`}>
                                    {t.tab}
                                </li>
                            </>
                        )
                    })}
                </ul>
            </div>

            {/* //render diff sections */}
            {
                activeId === 1 ? (
                    <>
                        {/* Orders Section */}
                        <div>
                            <MyOrderItem
                                image="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D"
                                name="Nike Air Force 1 Mid '07"
                                category="Men's Shoes"
                                size="10"
                                quantity={2}
                                price={98.3}
                                estimatedDelivery="24 Sep 2025"
                                onRemove={() => console.log('Remove item')}
                                onQuantityChange={(qty: number) =>
                                    console.log('New quantity:', qty)
                                }
                            />
                        </div>
                    </>
                ) : activeId === 2 ? (
                    <>
                        <Favorites />
                    </>
                ) : activeId === 3 ? (
                    <PaymentMethods />
                ) : (
                    <MyOrderItem
                        image="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D"
                        name="Nike Air Force 1 Mid '07"
                        category="Men's Shoes"
                        size="10"
                        quantity={2}
                        price={98.3}
                        estimatedDelivery="24 Sep 2025"
                        onRemove={() => console.log('Remove item')}
                        onQuantityChange={(qty: number) =>
                            console.log('New quantity:', qty)
                        }
                    />
                )
            }


        </div>
    )
}

export default MyOrderspage