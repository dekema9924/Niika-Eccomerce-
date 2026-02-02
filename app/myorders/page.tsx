'use client'
import MyOrderItem from '@/components/ui/myOrder/MyOrderItem'
import UserAvatarClient from '@/components/ui/user/UserAvatarClient'


function MyOrderspage() {
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
            <div className='border-b border-gray-200 mb-12 '>
                <ul className='flex items-center gap-12 '>
                    <li className='pb-4 border-b-2 border-black font-semibold cursor-pointer'>
                        My Orders
                    </li>
                    <li className='pb-4 text-gray-600 hover:text-black cursor-pointer'>
                        Favorites
                    </li>
                    <li className='pb-4 text-gray-600 hover:text-black cursor-pointer'>
                        Payment Methods
                    </li>
                </ul>
            </div>

            {/* Orders Section */}
            <div>
                <MyOrderItem
                    image="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D"
                    name="Nike Air Force 1 Mid '07"
                    category="Men's Shoes"
                    size="10"
                    quantity={2}
                    price={98.30}
                    estimatedDelivery="24 Sep 2025"
                    onRemove={() => console.log('Remove item')}
                    onQuantityChange={(qty: number) => console.log('New quantity:', qty)}
                />
            </div>

        </div>
    )
}

export default MyOrderspage