'use client'
import Favorites from '@/components/layout/myOrder/Favorites'
import MyOrderItem from '@/components/layout/myOrder/MyOrderItem'
import PaymentMethods from '@/components/layout/myOrder/PaymentMethods'
import UserAvatarClient from '@/components/layout/user/UserAvatarClient'
import { useState } from 'react'
import { authClient } from '@/lib/client/auth.client'
import { Loader2Icon } from 'lucide-react'


function MyOrderspage() {
    const [activeId, setActiveId] = useState<number>(1)
    const { data: session, isPending } = authClient.useSession()

    if (isPending) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <Loader2Icon className='w-8 h-8 animate-spin text-indigo-600' />
            </div>
        )
    }

    const tabs = [
        { tab: "my orders", id: 1 },
        { tab: "favorites", id: 2 },
        { tab: "payment methods", id: 3 }
    ]

    return (
        <div className='w-full min-h-screen bg-gray-50'>
            <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12'>

                {/* User Profile Section */}
                <div className='bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-8'>
                    <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4'>
                        <UserAvatarClient />
                        <div className='flex-1'>
                            <p className='font-bold text-lg sm:text-xl capitalize text-gray-900'>
                                {session?.user.name}
                            </p>
                            <span className='text-sm sm:text-base text-gray-600 block mt-1'>
                                {session?.user.email}
                            </span>
                            <span className={`inline-flex items-center gap-1 mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${session?.user.emailVerified
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${session?.user.emailVerified ? 'bg-green-600' : 'bg-yellow-600'
                                    }`}></span>
                                {session?.user.emailVerified ? "Verified" : "Not Verified"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className='bg-white rounded-xl shadow-sm mb-6 sm:mb-8 overflow-x-auto'>
                    <ul className='flex items-center border-b border-gray-200'>
                        {tabs.map((t) => (
                            <li
                                key={t.id}
                                onClick={() => setActiveId(t.id)}
                                className={`
                                    flex-1 min-w-fit px-4 sm:px-6 py-4 text-center capitalize text-sm sm:text-base font-medium cursor-pointer transition-all
                                    ${activeId === t.id
                                        ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }
                                `}
                            >
                                {t.tab}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Content Section */}
                <div className='bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8'>
                    {activeId === 1 && (
                        <div className='space-y-4'>
                            <h2 className='text-xl sm:text-2xl font-bold text-gray-900 mb-6'>My Orders</h2>
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
                    )}

                    {activeId === 2 && (
                        <div>
                            <h2 className='text-xl sm:text-2xl font-bold text-gray-900 mb-6'>Favorites</h2>
                            <Favorites />
                        </div>
                    )}

                    {activeId === 3 && (
                        <div>
                            <h2 className='text-xl sm:text-2xl font-bold text-gray-900 mb-6'>Payment Methods</h2>
                            <PaymentMethods />
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default MyOrderspage