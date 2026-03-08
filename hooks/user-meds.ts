import { MedicineFormValues } from "@/components/medicine/AddMedicine";
import { ApiResponse, MedicineDetailType } from "@/types/medicine";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export function useCreateMedicine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newMed: MedicineFormValues): Promise<MedicineDetailType> => {
      const response = await fetch('/api/medicines', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMed),
      });

      const result: ApiResponse<MedicineDetailType> = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to create medicine");
      }

      return result.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-meds'] });
    },
  });
}