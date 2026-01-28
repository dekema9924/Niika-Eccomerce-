
'use client'
import { Mail, Lock, User, Github, Eye, EyeClosed, LoaderCircle } from 'lucide-react';
import girl from '@/public/images/order_cancellation.png'
import Link from 'next/link';
import { useForm, SubmitHandler } from "react-hook-form"
import { signUp } from '@/lib/server/auth.actions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type formInputTypes = {
    name: string
    email: string
    password: string
}

export default function Signuppage() {
    const { register, setError, handleSubmit, formState: { errors, isSubmitting } } = useForm<formInputTypes>()
    const [isPasswordTxt, setIsPasswordTxt] = useState<string>("password")
    const router = useRouter()

    const onSubmit: SubmitHandler<formInputTypes> = async (data) => {
        const res = await signUp(data.name, data.email, data.password)
        if (!res.success) {
            console.log(res)

            if (res.error.toLowerCase().includes("exists")) {
                setError("email", {
                    type: "server",
                    message: res.error,
                });
                return;
            }
        }
        console.log(res)
        router.push('/auth/signin')


    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* Left Side - bgimage */}
            <div className="w-full lg:w-1/2 bg-black text-white flex flex-col justify-between p-6 lg:p-12 min-h-50 lg:min-h-screen relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-black/70 via-black/50 to-black/70 z-0"></div>
                <div className="absolute inset-0 z-0" style={{
                    backgroundImage: `url(${girl.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.4
                }}></div>
                <div className="flex items-center gap-2 relative z-10">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                        <span className="text-black font-bold text-xl">N</span>
                    </div>
                </div>

                <div className="relative z-10">
                    <h1 className="text-3xl lg:text-5xl font-bold mb-2 lg:mb-4">
                        Wear the Moment
                    </h1>
                    <p className="text-gray-200 text-sm lg:text-lg max-w-md">
                        Elevated essentials designed for everyday life — effortless style, made to move with you.
                    </p>
                </div>

                <div className="hidden lg:flex gap-2 relative z-10">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                </div>

                <p className="text-gray-200 text-xs lg:text-sm hidden lg:block relative z-10">© {new Date().getFullYear()} Niika. All rights reserved</p>
            </div>

            {/* Right Side - Light */}
            <div className="w-full lg:w-1/2 bg-gray-50 flex items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-md">
                    <div className="text-right mb-6 lg:mb-8">
                        <span className="text-gray-600 text-sm lg:text-base">Already have an account? </span>
                        <Link href="/auth/signin" className="text-black font-semibold underline text-sm lg:text-base">Sign In</Link>
                    </div>

                    <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
                        <h2 className="text-2xl lg:text-3xl font-bold text-center mb-2">Join Niika Today!</h2>
                        <p className="text-gray-500 text-sm lg:text-base text-center mb-6 lg:mb-8">Create your account to start your fitness journey</p>

                        {/* Social Login Buttons */}
                        <button className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2.5 lg:py-3 mb-3 hover:bg-gray-50 transition text-sm lg:text-base">
                            <svg viewBox="0 0 24 24" className="w-4 h-4 lg:w-5 lg:h-5">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>

                            <span className="font-medium">Continue with Google</span>
                        </button>

                        <button className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2.5 lg:py-3 mb-4 lg:mb-6 hover:bg-gray-50 transition text-sm lg:text-base">
                            <Github className="w-4 h-4 lg:w-5 lg:h-5" />
                            <span className="font-medium">Continue with Github</span>
                        </button>

                        <div className="flex items-center gap-4 mb-4 lg:mb-6">
                            <div className="flex-1 h-px bg-gray-300"></div>
                            <span className="text-gray-500 text-sm">Or sign up with</span>
                            <div className="flex-1 h-px bg-gray-300"></div>
                        </div>

                        {/* Form Fields */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 lg:space-y-4">
                            {/* name input */}
                            <div>
                                <label className="block text-xs lg:text-sm font-medium mb-1.5 lg:mb-2">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
                                    <input
                                        {...register("name", { required: "Name field cannot be empty" })}
                                        type="text"
                                        placeholder="Enter your full name"
                                        className="w-full pl-9 lg:pl-10 pr-4 py-2.5 lg:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm lg:text-base"
                                    />
                                </div>
                                {errors.name && (
                                    <span className='block text-xs text-red-500'>{errors.name.message}</span>

                                )}

                            </div>

                            {/* email input */}
                            <div>
                                <label className="block text-xs lg:text-sm font-medium mb-1.5 lg:mb-2">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
                                    <input
                                        {...register("email", {
                                            required: "Email address cannot be empty",
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "Enter a valid email address",
                                            },
                                        })}
                                        type="email"
                                        placeholder="johndoe@gmail.com"
                                        className="w-full pl-9 lg:pl-10 pr-4 py-2.5 lg:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm lg:text-base"
                                    />
                                </div>
                                {errors.email && (
                                    <span className='block text-xs text-red-500'>{errors.email.message}</span>

                                )}

                            </div>

                            {/* password input */}
                            <div>
                                <label className="block text-xs lg:text-sm font-medium mb-1.5 lg:mb-2">Password</label>
                                <div >
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
                                        <input
                                            {...register("password", {
                                                required: "Password field cannot be empty",
                                                maxLength: {
                                                    value: 15,
                                                    message: "Password cannot be more than 15 characters",
                                                },
                                                pattern: {
                                                    value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).+$/,
                                                    message: "Password must include one uppercase letter, one number, and one special character",
                                                },
                                            })}

                                            type={isPasswordTxt}
                                            autoComplete="new-password"
                                            placeholder="minimum 8 characters"
                                            className="w-full pl-9 lg:pl-10 pr-12 py-2.5 lg:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm lg:text-base"
                                        />
                                        {
                                            isPasswordTxt === 'text' ? <Eye onClick={() => setIsPasswordTxt("password")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" />
                                                : <EyeClosed onClick={() => setIsPasswordTxt("text")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" />

                                        }



                                    </div>
                                    {errors.password && (
                                        <span className='block text-xs text-red-500'>{errors.password.message}</span>

                                    )}

                                </div>
                            </div>



                            <button disabled={isSubmitting} className={`w-full  text-white py-2.5 lg:py-3 rounded-lg font-semibold hover:bg-gray-800 transition text-sm lg:text-base ${isSubmitting ? "bg-gray-700 cursor-default" : "bg-black"}`}>
                                {
                                    !isSubmitting ? "Sign Up" : <span className='flex items-center justify-center animate-spin'><LoaderCircle /></span>
                                }
                            </button>


                            <p className="text-center text-xs text-gray-500 mt-3 lg:mt-4">
                                By signing up, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
}