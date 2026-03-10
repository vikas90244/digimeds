'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useResendOTP, useVerifyOTP } from '@/hooks/auth';
import toast from 'react-hot-toast';
import { ArrowRight} from 'lucide-react';

function VerifyContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const email = searchParams.get('email');

    const [code, setCode] = useState('');
    const { mutate, isPending } = useVerifyOTP();
    const [resendError, setResendError]= useState('');
    if (!email) {
        router.push('/register');
        return null;
    }
    const { mutate: resendOTP, isPending: isResending } = useResendOTP();
    const [countdown, setCountdown] = useState(0);

    const handleResend = () => {
        resendOTP(email, {
            onSuccess: () => {
                toast.success("A fresh code has been sent!");
                setCountdown(60); 
                
                const timer = setInterval(() => {
                    setCountdown((prev) => {
                        if (prev <= 1) {
                            clearInterval(timer);
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);
            },
            onError: (error) => {
                if(error.message.toLowerCase().includes('many attempts')){
                   setResendError(error.message);
                } else{
                    toast.error(error.message); 

                }
            }
        });
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (code.length !== 6) {
            toast.error("Please enter the full 6-digit code.");
            return;
        }

        mutate({ email, code }, {
            onSuccess: () => {
                toast.success("Email verified successfully!");
                router.push('/login'); 
            },
            onError: (error) => {
                if(error.message.toLowerCase().includes('already verified')){
                    toast.error("user already verified");
                    router.push('/login');
                    return;
                }
                toast.error(error.message);
            }
        });
    };

    return (
        <div className='flex flex-col rounded-md bg-gray-100 border border-main/10 px-6 md:px-10 lg:px-12 py-8'>
            <div className="text-center flex flex-col items-center">
               
                {/* <h1 className="text-lg font-semibold text-main">Check your email</h1> */}
                { resendError!=='' ? (<p className='text-sm font-medium text-orange-600 mt-2 max-w-[250px] mx-auto'>{resendError}</p>):( <p className="text-sm font-medium text-main/60 mt-2 max-w-[250px] mx-auto">
                    We've sent a 6-digit verification code to <span className="text-main font-bold">{email}</span>.
                </p>)}

                <form onSubmit={handleSubmit} className="mt-8 w-full flex flex-col items-center">
                    <input 
                        type="text"
                        maxLength={6}
                        value={code}
                        onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                        placeholder="000000"
                        className="w-56 text-left text-3xl tracking-[0.5em] font-bold py-2 px-3 bg-cream/50 border border-main/10 rounded-xl text-main focus:outline-none focus:ring-2 placeholder:text-center focus:ring-theme/20 focus:border-theme transition-all "
                    />

                    <button 
                        type="submit" 
                        disabled={isPending || code.length !== 6}
                        className="px-5 md:px-8 mt-8 hover:cursor-pointer bg-main text-white py-3 rounded-xl text-xs font-bold hover:bg-main/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {isPending ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>Verify Account <ArrowRight className="w-4 h-4" /></>
                        )}
                    </button>
                </form>

                <p className="text-center mt-6 text-xs text-main/60 font-medium">
                    Didn't receive a code?{' '}
                    <button 
                        type="button"
                        disabled={countdown > 0 || isResending}
                        onClick={handleResend}
                        className={`text-theme-bold ${countdown>0 ? '':'hover:cursor-pointer'} font-bold hover:underline disabled:text-gray-400 disabled:no-underline disabled:cursor-not-allowed`}
                    >
                        {countdown > 0 ? `Resend in ${countdown}s` : 'Resend'}
                    </button>
                </p>
            </div>
        </div>
    );
}

export default function VerifyPage() {
    return (
        <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
            <VerifyContent />
        </Suspense>
    );
}