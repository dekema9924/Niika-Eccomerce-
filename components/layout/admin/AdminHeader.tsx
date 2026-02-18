'use client'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import { LayoutDashboard, Package, ShoppingBag, Settings, LogOut, Users, FolderTree } from 'lucide-react'
import { The_Girl_Next_Door } from 'next/font/google'
import Menu from '@/components/ui/Menu'
import { useEffect, useState } from 'react'
import { authClient } from '@/lib/client/auth.client'

const girl = The_Girl_Next_Door({
    subsets: ['latin'],
    weight: ['400',],
})

export default function AdminHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const session = authClient.useSession()

    // disable scroll when menu is open on mobile
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };
        if (isMenuOpen && window.innerWidth < 768) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        window.addEventListener('resize', handleResize);
        return () => {
            document.body.style.overflow = '';
        };

    }, [isMenuOpen]);

    const CloseMenu = () => {
        setIsMenuOpen(!isMenuOpen)

        if (!isMenuOpen) {
            setIsSettingsOpen(false)
        }
    }

    const handleLogout = async () => {
        await authClient.signOut()
        window.location.href = '/auth/signin'
    }

    return (
        <header className='h-20 flex items-center justify-between md:px-8 px-3 relative xl:w-10/12 m-auto border-b border-gray-200'>
            {/* left-nav */}
            <div className='flex items-center gap-4'>
                <div>
                    <div onClick={() => CloseMenu()}>
                        <Menu
                            isMenuOpen={isMenuOpen}
                            setIsMenuOpen={setIsMenuOpen}
                        />
                    </div>

                    {/* nav_menuItems */}
                    <nav className={`bg-white text-black z-50 absolute min-w-screen md:min-w-9/12 md:max-w-190 flex flex-col md:flex-row md:justify-between md:items-start top-20 md:top-20 left-0 md:left-auto
                    shadow-md p-6 md:p-4 gap-3 ${isMenuOpen ? 'block' : 'hidden'}`}>
                        <div className={`flex gap-3 flex-col md:mt-10 font-semibold ${girl.className}`} style={{ fontWeight: 700 }}>
                            <p className='font-bold text-3xl'>Admin Menu</p>

                            <Link
                                onClick={() => setIsMenuOpen(false)}
                                href={'/admin/dashboard'}
                                className='flex items-center gap-2 hover:text-gray-600 transition-colors'
                            >
                                <LayoutDashboard size={18} />
                                Dashboard
                            </Link>

                            <Link
                                onClick={() => setIsMenuOpen(false)}
                                href={'/admin/products'}
                                className='flex items-center gap-2 hover:text-gray-600 transition-colors'
                            >
                                <Package size={18} />
                                Products
                            </Link>

                            <Link
                                onClick={() => setIsMenuOpen(false)}
                                href={'/admin/orders'}
                                className='flex items-center gap-2 hover:text-gray-600 transition-colors'
                            >
                                <ShoppingBag size={18} />
                                Orders
                            </Link>

                            <Link
                                onClick={() => setIsMenuOpen(false)}
                                href={'/admin/categories'}
                                className='flex items-center gap-2 hover:text-gray-600 transition-colors'
                            >
                                <FolderTree size={18} />
                                Categories
                            </Link>

                            <Link
                                onClick={() => setIsMenuOpen(false)}
                                href={'/admin/users'}
                                className='flex items-center gap-2 hover:text-gray-600 transition-colors'
                            >
                                <Users size={18} />
                                Users
                            </Link>

                            <div className='border-t border-gray-200 my-2 pt-2'>
                                <Link
                                    onClick={() => setIsMenuOpen(false)}
                                    href={'/'}
                                    className='flex items-center gap-2 hover:text-gray-600 transition-colors text-sm'
                                >
                                    View Store
                                </Link>
                            </div>
                        </div>

                        <div className='my-4 md:ml-8'>
                            <h1 className={`font-bold text-xl ${girl.className}`} style={{ fontWeight: 700 }}>
                                Admin Panel
                            </h1>
                            <div className='bg-gray-100 rounded-lg p-6 my-3 w-48'>
                                <p className='text-sm text-gray-600 mb-2'>Welcome back,</p>
                                <p className='font-semibold text-lg'>{session.data?.user?.name || 'Admin'}</p>
                                <p className='text-xs text-gray-500 mt-1'>{session.data?.user?.email}</p>
                            </div>
                            <p className='text-xs text-gray-500 mt-3'>
                                Logged in as Administrator
                            </p>
                        </div>
                    </nav>
                </div>
            </div>

            {/* logo */}
            <div className='flex items-center gap-2'>
                <Logo />
                <span className='text-xs font-medium text-gray-500 hidden md:block'>ADMIN</span>
            </div>

            {/* right-nav */}
            <div className='flex items-center gap-3'>
                <Link href={'/admin/products/new'}>
                    <button className='hidden md:flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors'>
                        <Package size={16} />
                        Add Product
                    </button>
                    {/* Mobile Add Button */}
                    <button className='md:hidden p-2 bg-black text-white rounded hover:bg-gray-800 transition-colors'>
                        <Package size={20} />
                    </button>
                </Link>

                <div className='relative'>
                    <Settings
                        onClick={() => { setIsSettingsOpen(!isSettingsOpen) }}
                        className='cursor-pointer hover:rotate-90 transition-transform duration-300'
                    />

                    {isSettingsOpen && (
                        <>
                            {/* Backdrop */}
                            <div
                                className='fixed inset-0 z-40'
                                onClick={() => setIsSettingsOpen(false)}
                            ></div>

                            <div className='absolute right-0 top-12 bg-white shadow-lg rounded-lg p-4 w-48 z-50 border border-gray-200'>
                                <div className='flex flex-col gap-3'>
                                    <Link
                                        href={'/admin/settings'}
                                        className='flex items-center gap-2 text-sm hover:text-gray-600 transition-colors'
                                        onClick={() => setIsSettingsOpen(false)}
                                    >
                                        <Settings size={16} />
                                        Settings
                                    </Link>

                                    <Link
                                        href={'/admin/profile'}
                                        className='flex items-center gap-2 text-sm hover:text-gray-600 transition-colors'
                                        onClick={() => setIsSettingsOpen(false)}
                                    >
                                        <Users size={16} />
                                        Profile
                                    </Link>

                                    <div className='border-t border-gray-200 my-1'></div>

                                    <button
                                        onClick={handleLogout}
                                        className='flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition-colors'
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}