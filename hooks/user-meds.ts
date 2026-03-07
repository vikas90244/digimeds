import { ApiResponse, MedicineDetailType } from "@/types/medicine";
import { useQuery } from "@tanstack/react-query";

export function useFetchUserMedDetails(){
    return useQuery({
        queryKey: ['user-meds'],
        queryFn: getUserMedDetails,
    });
}

async function getUserMedDetails(): Promise<MedicineDetailType[]> {
    try {
        const response = await fetch('/api/medicines', {
            method: "GET"
        });

        const result: ApiResponse<MedicineDetailType[]> = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.error || "Server returned an error");
        }

        return result.data || [];

    } catch (error: any) {
        throw new Error(error?.message || "something unexpected happen! ");
    }
}