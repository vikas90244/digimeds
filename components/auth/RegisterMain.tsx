'use client';
import { useRegisterUser } from '@/hooks/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Lock, Mail, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';


const registerSchema = z.object({
    name: z.string().min(3, "name must be atleast 3 characters."), 
    email: z.email("Please enter a valid mail"), 
    password: z.string().min(6, "password must be atleast 6 characters"), 
});

export type RegisterValueType = z.infer<typeof registerSchema>;

function RegisterMain() {
    const router = useRouter();
    const {mutate, isPending} = useRegisterUser();

    // connect zod schema with RHF and intialization 
    const {handleSubmit,register, reset,  formState: { errors }} = useForm<RegisterValueType>({
        resolver:zodResolver(registerSchema),
        mode: 'onTouched'
    });
    const onSubmit= async(data:RegisterValueType)=>{
      mutate(data, {
        onSuccess:()=>{
          toast.success("Account created! Redirecting...");
          reset();
          router.push(`/verify?email=${encodeURIComponent(data.email)}`);
        }, 
        onError: (error) =>{
          if(error.message.toLowerCase().includes('already registered')){
              reset();
              toast.error(error.message);
          } else{
              toast.error(error.message);
          }
        }
      })
        console.log("data from form: ", data);
    }

  return (
    <div className='flex flex-col w-78 md:w-auto rounded-xl bg-gray-100 border border-main/10 px-4 md:px-5 lg:px-12 py-4'>
        <div className="text-center">
        <h1 className="text-xl font-semibold text-main">Create an account</h1>
        <p className="text-sm font-medium text-main/60 mt-1">Manage your health inventory securely.</p>

        <form onSubmit={handleSubmit(onSubmit)}>
            {/* name */}
            <div className='mt-8'>
           <label className="block text-[0.65rem] text-left font-bold text-main mb-1.5">Full Name</label>
            <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-main/40" />
                <input 
                {...register('name')}
                placeholder="John Doe"
                className={`w-full pl-10 pr-4 py-2.5 bg-cream/50 border font-medium rounded-xl text-sm transition-all focus:outline-none focus:ring-2 
                    ${errors.name ? 'border-red-300 focus:ring-red-200' : 'border-main/10 focus:ring-theme-bold/20 focus:border-theme-bold'}`}
                />
            </div>
             {errors.name && <p className="text-[10px] text-left text-red-500 font-semibold mt-1">{errors.name.message}</p>}
            </div>


            {/* email */}
            <div className='mt-4'>
            <label className="block text-[0.65rem] text-left font-bold text-main mb-1.5">Email Address</label>
            <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-main/40" />
                <input 
                type="email"
                {...register('email')}
                placeholder="you@example.com"
                className={`w-full pl-10 pr-4 py-2.5 bg-cream/50 border rounded-xl text-sm font-medium transition-all focus:outline-none focus:ring-2
                     ${errors.email ? 'border-red-300 focus:ring-red-200' : 'border-main/10 focus:ring-theme-bold/20 focus:border-theme-bold'}`}
                />
            </div>
            {errors.email && <p className="text-[10px] text-left text-red-500 font-semibold mt-1">{errors.email.message}</p>}
            </div>

            {/* password */}
            <div className='mt-4'>
                <label className="block text-[0.65rem] text-left font-bold text-main mb-1.5">Password</label>
                <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-main/40" />
                <input 
                type="password"
                {...register('password')}
                placeholder="••••••••"
                className={`w-full pl-10 pr-4 py-2.5 bg-cream/50 border rounded-xl text-sm font-medium transition-all focus:outline-none focus:ring-2
                     ${errors.password ? 'border-red-300 focus:ring-red-200' : 'border-main/10 focus:ring-theme-bold/20 focus:border-theme-bold'}`}
                />
                </div>
                {errors.password && <p className="text-[10px] text-left text-red-500 font-semibold mt-1">{errors.password.message}</p>}
            </div>
            <button 
          type="submit" 
           disabled={isPending}
          className="w-full mt-8 hover:cursor-pointer bg-main text-white py-2.5 rounded-xl text-xs font-bold hover:bg-main/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isPending ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>Create Account <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
        </form>
        <p className="text-center mt-2 text-xs text-main/60 font-medium">
        Already have an account? <Link href="/login" className="text-theme-bold font-bold hover:underline">Log in</Link>
      </p>
      </div>
    </div>
  )
}

export default RegisterMain