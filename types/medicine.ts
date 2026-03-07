export interface MedicineDetailType {
 _id: string;
  name: string;
  type: "stored" | "scheduled";
  instructions?: string;
  warnings?: string;
  expiryDate?: string;
  createdAt: string; 
  updatedAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}