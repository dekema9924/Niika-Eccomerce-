
'use client'
import React, { useState, useEffect } from 'react'
import { authClient } from '@/lib/client/auth.client'
import { sendEmailOTP, verifyEmailOTP } from '@/lib/server/auth.actions'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function VerifyEmailPage() {
    const [code, setCode] = useState(['', '', '', '', '', ''])
    const [isVerifying, setIsVerifying] = useState(false)
    const { data: session } = authClient.useSession()
    const [resendTimer, setResendTimer] = useState(50)
    const router = useRouter()


    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setInterval(() => {
                setResendTimer(prev => prev - 1)
            }, 1000)
            return () => clearInterval(timer)
        }
    }, [resendTimer])


    const handleChange = (index: number, value: string) => {
        if (value.length > 1) return

        const newCode = [...code]
        newCode[index] = value
        setCode(newCode)

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`code-${index + 1}`)
            nextInput?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            const prevInput = document.getElementById(`code-${index - 1}`)
            prevInput?.focus()
        }
    }

    const handleVerify = async () => {
        setIsVerifying(true)
        await new Promise(resolve => setTimeout(resolve, 1500))
        if (session?.user.email && !session.user.emailVerified) {
            //verify otp
            await verifyEmailOTP(session.user.email, code.join('')).then((res) => {
                if (res.success) {
                    toast.success("Email Verified")
                    window.location.href = '/'

                } else {
                    toast.error(res.error)
                }

            })
        } else {
            router.push('/')
        }



        setIsVerifying(false)
    }




    //resend otp
    const HandleResendOTP = async () => {
        if (session?.user.email && !session.user.emailVerified) {
            await sendEmailOTP(session?.user.email, "email-verification")

        }
        setResendTimer(50)
        setCode(['', '', '', '', '', ''])
    }

    const isComplete = code.every(digit => digit !== '')
    const canResend = resendTimer === 0

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Verify your email</h1>
                    <p className="text-gray-600">We've sent a 6-digit code to<br />
                        <span className="font-medium text-gray-900">{session?.user.email}</span>
                    </p>
                </div>

                <div className="mb-6">
                    <div className="flex gap-2 justify-center mb-2">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                id={`code-${index}`}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value.replace(/\D/g, ''))}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-12 h-14 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                            />
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleVerify}
                    disabled={!isComplete || isVerifying}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors mb-4"
                >
                    {isVerifying ? 'Verifying...' : 'Verify Email'}
                </button>

                <div className="text-center text-sm text-gray-600">
                    Didn't receive the code?{' '}
                    {canResend ? (
                        <button
                            onClick={HandleResendOTP

                            }
                            className="text-indigo-600 cursor-pointer font-medium hover:underline"
                        >
                            Resend
                        </button>
                    ) : (
                        <span className="text-gray-400">
                            Resend in {resendTimer}s
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}