import { NextResponse } from "next/server";
import Medicine from "@/models/Medicine";
import { connectDB } from "@/lib/mongodb";
import { ApiResponse, MedicineDetailType } from "@/types/medicine";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { User } from "@/models/User";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json<ApiResponse>({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const currentUser = await User.findOne({ email: session.user.email });
    if (!currentUser) {
      return NextResponse.json<ApiResponse>({ success: false, error: "User not found" }, { status: 404 });
    }

    const { id } = await params;
    const medicine = await Medicine.findOne({ _id: id, userId: currentUser._id });

    if (!medicine) {
      return NextResponse.json<ApiResponse>({ success: false, error: "Medicine not found" }, { status: 404 });
    }

    return NextResponse.json<ApiResponse<MedicineDetailType>>({ success: true, data: medicine }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>({ success: false, error: "Failed to fetch medicine" }, { status: 500 });
  }
}
