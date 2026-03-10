import { useMutation } from "@tanstack/react-query";
import { RegisterValueType } from "@/components/auth/RegisterMain";
import { signIn } from "next-auth/react";
import { LoginValueType } from "@/components/auth/LoginMain";

export interface VerifyOTPPayload {
    email: string;
    code: string;
}

export function useRegisterUser() {
    return useMutation({
        mutationFn: async (data: RegisterValueType): Promise<boolean> => {
            const response = await fetch('/api/auth/register', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error || "Failed to create account");
            }

            return result.success;
        }
    });
}


export function useVerifyOTP() {
    return useMutation({
        mutationFn: async (payload: VerifyOTPPayload) => {
            const response = await fetch('/api/auth/verify-otp', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error || "Failed to verify code");
            }

            return result;
        }
    });
}




export function useLogin() {
    return useMutation({
        mutationFn: async (data: LoginValueType) => {
            const result = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false, 
            });

            // throw an error so tanStack query knows the mutation failed!
            if (result?.error) {
                throw new Error(result.error);
            }

            // Return the result if successful
            return result;
        }
    });
}


export function useResendOTP() {
    return useMutation({
        mutationFn: async (email: string) => {
            const response = await fetch('/api/auth/resend-otp', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error || "Failed to resend code");
            }

            return result; 
        }
    });
}