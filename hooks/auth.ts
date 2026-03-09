import { useMutation } from "@tanstack/react-query";
import { RegisterValueType } from "@/components/auth/RegisterMain";

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