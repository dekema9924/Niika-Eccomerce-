'use client'
import { ResetUserPassword } from '@/lib/server/auth.actions';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/client/auth.client';

type Inputs = {
    newPassword: string
    confirmPassword: string
}

export default function ResetPassword() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [istoken, setToken] = useState<string | null>("")
    const router = useRouter()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>()

    const newPassword = watch("newPassword", "");
    const confirmPassword = watch("confirmPassword", "");


    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get("token")

        if (!token) {
            toast.error("Invalid or expired verification link")
            router.replace("/auth/forgot-password")
            return
        }
        setToken(token)

    }, [router])


    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        try {
            const res = await ResetUserPassword(data.confirmPassword, istoken ?? "");

            if (res.success) {
                try {
                    // Revoke all other user sessions
                    await authClient.revokeOtherSessions();
                    console.log("Other sessions revoked successfully");
                } catch (sessionError) {
                    console.error("Failed to revoke other sessions:", sessionError);
                    // Continue anyway - don't block password reset success
                }

                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                setIsSubmitted(true);
            } else {
                // Handle failed password reset
                console.error("Password reset failed:", res);
            }
        } catch (error) {
            console.error("Error during password reset:", error);
        }


    }

    const getPasswordStrength = () => {
        if (newPassword.length === 0) return { strength: '', color: '' };
        if (newPassword.length < 8) return { strength: 'Weak', color: 'text-red-600' };
        if (newPassword.length < 10) return { strength: 'Medium', color: 'text-yellow-600' };
        return { strength: 'Strong', color: 'text-green-600' };
    };

    const passwordStrength = getPasswordStrength();

    // Check individual password requirements
    const hasMinLength = newPassword.length >= 8;
    const hasUppercase = /[A-Z]/.test(newPassword);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword);
    const passwordsMatch = newPassword === confirmPassword && newPassword.length > 0;

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-emerald-100 px-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Password Reset Successful!</h2>
                    <p className="text-gray-600 mb-6">
                        Your password has been successfully reset. You can now log in with your new password.
                    </p>
                    <Link
                        href="/auth/signin"
                        className="inline-block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-200"
                    >
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-50 to-blue-100 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Reset Password</h1>
                    <p className="text-gray-600">Enter your new password below.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                id="newPassword"
                                type={showPassword ? 'text' : 'password'}
                                {...register("newPassword", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters"
                                    },
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
                                        message: "Password must contain at least one uppercase letter and one special character"
                                    }
                                })}
                                placeholder="Enter new password"
                                className={`w-full px-4 py-3 pr-12 border ${errors.newPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {errors.newPassword && (
                            <p className="text-red-600 text-sm mt-1">{errors.newPassword.message}</p>
                        )}
                        {newPassword && !errors.newPassword && (
                            <p className={`text-sm mt-2 font-medium ${passwordStrength.color}`}>
                                {passwordStrength.strength}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <input
                                id="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: (value) => value === newPassword || "Passwords do not match"
                                })}
                                placeholder="Confirm new password"
                                className={`w-full px-4 py-3 pr-12 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showConfirmPassword ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Password requirements:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li className="flex items-center">
                                <span className={hasMinLength ? 'text-green-600' : 'text-gray-400'}>
                                    {hasMinLength ? '✓' : '○'}
                                </span>
                                <span className="ml-2">At least 8 characters</span>
                            </li>
                            <li className="flex items-center">
                                <span className={hasUppercase ? 'text-green-600' : 'text-gray-400'}>
                                    {hasUppercase ? '✓' : '○'}
                                </span>
                                <span className="ml-2">At least one uppercase letter</span>
                            </li>
                            <li className="flex items-center">
                                <span className={hasSpecialChar ? 'text-green-600' : 'text-gray-400'}>
                                    {hasSpecialChar ? '✓' : '○'}
                                </span>
                                <span className="ml-2">At least one special character</span>
                            </li>
                            <li className="flex items-center">
                                <span className={passwordsMatch ? 'text-green-600' : 'text-gray-400'}>
                                    {passwordsMatch ? '✓' : '○'}
                                </span>
                                <span className="ml-2">Passwords match</span>
                            </li>
                        </ul>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full cursor-pointer bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center"
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Resetting...
                            </>
                        ) : (
                            'Reset Password'
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <Link href="/auth/signin" className="text-sm text-gray-600 hover:text-gray-800 flex items-center justify-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}