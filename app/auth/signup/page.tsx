
'use client'
import { Mail, Lock, User, Github, Eye, EyeClosed, LoaderCircle } from 'lucide-react';
import girl from '@/public/images/order_cancellation.png'
import Link from 'next/link';
import { useForm, SubmitHandler } from "react-hook-form"
import { signUp } from '@/lib/server/auth.actions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SigninSocialButton from '@/components/ui/SIgnInSocialBtn';
import { GoogleIcon } from '@/public/icons/GoogleIcon';
import { HandleSignInWithSocial } from '@/lib/client/HandleSocial';

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
                        <SigninSocialButton
                            providerName="Google"
                            Icon={GoogleIcon}
                            onClick={() => HandleSignInWithSocial("google")}
                            borderColor="border-gray-300"
                            hoverBg="hover:bg-gray-50"
                        />

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