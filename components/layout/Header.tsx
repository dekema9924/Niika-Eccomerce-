'use client'
import Link from 'next/link'
import Logo from '../ui/Logo'
import { Search, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { The_Girl_Next_Door } from 'next/font/google'
import girl_fasion from '@/public/images/home/girl_fasion.png'
import Menu from '../ui/Menu'
import { useEffect, useState } from 'react'
import Cart from '../ui/cart/Cart'
import { useCartContext } from '@/context/CartContext'
import { useSearchContext } from '@/context/SearchContext'
import UserAvatar from '../ui/user/UserAvatar'
import MyAccountModal from '../ui/user/MyAccountModal'
import { useAccountModal } from '@/context/ModalContext'

const girl = The_Girl_Next_Door({
    subsets: ['latin'],
    weight: ['400',],
})

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isCartOpen, setIsCartOpen } = useCartContext()
    const { setIsSearchOpen } = useSearchContext()
    const { isOpen, setIsOpen } = useAccountModal()


    // disable scroll when menu is open on mobile
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };
        if (isMenuOpen && window.innerWidth < 768) {
            document.body.style.overflow = 'hidden'; // disable scroll
        } else {
            document.body.style.overflow = ''; // restore scroll
        }

        window.addEventListener('resize', handleResize);
        return () => {
            document.body.style.overflow = '';
        };

    }, [isMenuOpen]);


    return (
        <header className='h-20  flex items-center justify-between md:px-8 px-3 relative  xl:w-10/12 m-auto'>
            {/* left-nav */}
            <div className='flex items-center gap-4  '>
                <div>
                    <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <Menu
                            isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}
                        />
                    </div>


                    {/* nav_menuItems */}
                    <nav className={`bg-white  z-50 absolute min-w-screen  md:min-w-9/12 md:max-w-190 flex flex-col  md:flex-row md:justify-between md:items-start top-20 md:top-20 left-0 md:left-auto
                    shadow-md p-6 md:p-4 gap-3 ${isMenuOpen ? 'block' : 'hidden'}`}>
                        <div className={`flex gap-3 flex-col md:mt-10 font-semibold ${girl.className}`} style={{ fontWeight: 700 }}>
                            <p className='font-bold text-3xl'>Info</p>
                            <Link onClick={() => setIsMenuOpen(false)} href={'/returns'}>Returns</Link>
                            <Link onClick={() => setIsMenuOpen(false)} href={'/shipping'}>Shipping</Link>
                            <Link onClick={() => setIsMenuOpen(false)} href={'/cancellation'}>Order Cancellation</Link>
                            <Link onClick={() => setIsMenuOpen(false)} href={'/auth/signup'}>Sign-Up</Link>
                            <Link onClick={() => setIsMenuOpen(false)} href={'/auth/signin'}>Sign-In</Link>


                        </div>
                        <div className='my-4'>
                            <h1 className={`font-bold text-xl  ${girl.className}`} style={{ fontWeight: 700 }}>NIIKA's store</h1>
                            <Image
                                src={girl_fasion}
                                alt='store image'
                                width={190}
                                height={190}
                                loading="lazy"
                                className='w-90 h-55  object-cover object-[center_2%] my-3'
                            />
                            <Link href={'/store'} className='font-bold  text-sm'>Discover all</Link>
                        </div>



                    </nav>
                </div>

                <div className='md:flex hidden gap-3 font-semibold items-center'>
                    <p>Women</p>
                    <p>Men</p>
                </div>
            </div>

            {/* logo */}
            <Logo />

            {/* right-nav */}
            <div className='flex items-center gap-4'>
                <Search onClick={() => { setIsSearchOpen(true) }} className='cursor-pointer' />
                <ShoppingCart onClick={() => { setIsCartOpen(true) }} className='cursor-pointer' />
                {

                    <Cart
                        isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />

                }
                <div className='relative'>
                    <UserAvatar setIsAccountModalOpen={setIsOpen} />
                    {
                        isOpen && (
                            <MyAccountModal />
                        )
                    }
                </div>
            </div>
        </header>
    )
}
