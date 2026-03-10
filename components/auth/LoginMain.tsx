'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import { useLogin, useResendOTP } from '@/hooks/auth';

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(1, "Password is required"), 
});

export type LoginValueType = z.infer<typeof loginSchema>;

export default function LoginMain() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {mutate, isPending} = useLogin();
    const {mutate:resendOTP} = useResendOTP();

    
    const handleGuestLogin = () => {
    setIsLoading(true);
    signIn("credentials", {
        email: "guest@digimeds.com",
        password: "demo123",
        redirect: true,
        callbackUrl: "/dashboard"
        });
    };


    const { handleSubmit, register, formState: { errors } } = useForm<LoginValueType>({
        resolver: zodResolver(loginSchema),
        mode: 'onTouched'
    });


    const onSubmit = async (data: LoginValueType) => {

        mutate(data, {
            onSuccess:()=>{
                toast.success("Logged In. successfully! ");
                router.push('/dashboard');
                router.refresh();
            }, 

            onError:(error, data)=>{

                if (error.message.toLowerCase().includes("verify")) {
                toast.success("Check your inbox to verify your account!");

                    resendOTP(data.email, {
                    onSuccess: () => {
                        toast.success("A fresh code has been sent!");
                    },
                    onError: (error) => {
                            toast.error(error.message);         
                    }
        });
                
                router.push(`/verify?email=${encodeURIComponent(data.email)}`);
            } else {
                toast.error(error.message); 
            }
            }
        })
    };

  return (
    <div className='flex flex-col  w-78 md:w-auto rounded-xl bg-gray-100 border border-main/10 px-4 md:px-5 lg:px-12 py-4'>
        <div className="text-center">
            <h1 className="text-xl font-semibold text-main">Welcome back</h1>
            <p className="text-sm font-medium text-main/60 mt-1">Sign in to manage your inventory.</p>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email Input */}
                <div className='mt-8'>
                    <label className="block text-[0.65rem] text-left font-bold text-main mb-1.5">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-main/40" />
                        <input 
                            type="email"
                            {...register('email')}
                            placeholder="you@example.com"
                            className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-xl text-sm font-medium transition-all focus:outline-none focus:ring-2
                                ${errors.email ? 'border-red-300 focus:ring-red-200' : 'border-main/10 focus:ring-theme-bold/20 focus:border-theme-bold'}`}
                        />
                    </div>
                    {errors.email && <p className="text-[10px] text-left text-red-500 font-semibold mt-1">{errors.email.message}</p>}
                </div>

                {/* Password Input */}
                <div className='mt-4'>
                    <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-[0.65rem] font-bold text-main">Password</label>
                        <Link href="/forgot-password" className="text-[0.65rem] font-bold text-theme-bold hover:underline">Forgot?</Link>
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-main/40" />
                        <input 
                            type="password"
                            {...register('password')}
                            placeholder="••••••••"
                            className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-xl text-sm font-medium transition-all focus:outline-none focus:ring-2
                                ${errors.password ? 'border-red-300 focus:ring-red-200' : 'border-main/10 focus:ring-theme-bold/20 focus:border-theme-bold'}`}
                        />
                    </div>
                    {errors.password && <p className="text-[10px] text-left text-red-500 font-semibold mt-1">{errors.password.message}</p>}
                </div>

                {/* Submit Button */}
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full mt-8 hover:cursor-pointer bg-main text-white py-2.5 rounded-xl text-xs font-bold hover:bg-main/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                    {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>Sign In <ArrowRight className="w-4 h-4" /></>
                    )}
                </button>
            </form>
            
            {/* Register Link */}
            <p className="text-center mt-4 text-xs text-main/60 font-medium">
                Don't have an account? <Link href="/register" className="text-theme-bold font-bold hover:underline">Sign up</Link>
            </p>

            <button 
                type="button" 
                onClick={handleGuestLogin}
                className="w-full mt-3 bg-white hover:cursor-pointer text-main border border-main/20 py-2.5 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all"
            >
                Try Demo as Guest
            </button>
        </div>
    </div>
  )
}