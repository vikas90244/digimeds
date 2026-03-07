import { NextResponse } from "next/server";
import Medicine from "@/models/Medicine";
import { connectDB } from "@/lib/mongodb";
import { ApiResponse, MedicineDetailType } from "@/types/medicine";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const medicine = await Medicine.create(body);

    // Predictable Success Response
    return NextResponse.json<ApiResponse<MedicineDetailType>>(
      { success: true, data: medicine },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST Error:", error);
    
    // Predictable Error Response
    return NextResponse.json<ApiResponse>(
      { success: false, error: error.message || "Failed to create medicine" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const medicines = await Medicine.find().sort({ createdAt: -1 });

    return NextResponse.json<ApiResponse<MedicineDetailType[]>>(
      { success: true,
        data: medicines },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("GET Error:", error);
    
    // Predictable Error Response
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Failed to fetch medicines" },
      { status: 500 }
    );
  }
}