
'use client'
import Link from 'next/link'
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react'
import { The_Girl_Next_Door } from 'next/font/google'

const girl = The_Girl_Next_Door({
    subsets: ['latin'],
    weight: ['400'],
})

export default function UnauthorizedPage() {
    return (
        <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4'>
            <div className='max-w-md w-full'>
                <div className='bg-white rounded-lg shadow-lg p-8 text-center'>
                    {/* Icon */}
                    <div className='flex justify-center mb-6'>
                        <div className='bg-red-100 p-4 rounded-full'>
                            <ShieldAlert className='text-red-600' size={48} />
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className={`text-3xl font-bold text-gray-900 mb-3 ${girl.className}`} style={{ fontWeight: 700 }}>
                        Access Denied
                    </h1>

                    {/* Message */}
                    <p className='text-gray-600 mb-2'>
                        You don't have permission to access this page.
                    </p>
                    <p className='text-sm text-gray-500 mb-8'>
                        This area is restricted to administrators only.
                    </p>

                    {/* Error Code */}
                    <div className='bg-gray-100 rounded-lg py-3 px-4 mb-8'>
                        <p className='text-xs text-gray-500 uppercase tracking-wider'>Error Code</p>
                        <p className='text-2xl font-bold text-gray-900 mt-1'>403</p>
                    </div>

                    {/* Actions */}
                    <div className='space-y-3'>
                        <Link
                            href='/'
                            className='flex items-center justify-center gap-2 w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors font-medium'
                        >
                            <Home size={18} />
                            Go to Homepage
                        </Link>

                        <button
                            onClick={() => window.history.back()}
                            className='flex items-center justify-center gap-2 w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-medium'
                        >
                            <ArrowLeft size={18} />
                            Go Back
                        </button>
                    </div>

                    {/* Help Text */}
                    <p className='text-xs text-gray-500 mt-6'>
                        If you believe this is a mistake, please contact support.
                    </p>
                </div>
            </div>
        </div>
    )
}