import { NextResponse } from "next/server";
import Medicine from "@/models/Medicine";
import { connectDB } from "@/lib/mongodb";
import { ApiResponse, MedicineDetailType } from "@/types/medicine";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if(!session?.user?.email){
      return NextResponse.json(
        { success: false, error: "Unauthorized: Please log in" },
        { status: 401 });
    }

    const currentUser = await User.findOne({email: session.user.email});

    if (!currentUser) {
       return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    const body = await req.json();
    const medicineData = {
      ...body,
      userId: currentUser._id
    };

    const medicine = await Medicine.create(medicineData);

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
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2. Get the user's DB ID
    const currentUser = await User.findOne({ email: session.user.email });
    if (!currentUser) {
       return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    const medicines = await Medicine.find({userId:currentUser._id}).sort({ createdAt: -1 });

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