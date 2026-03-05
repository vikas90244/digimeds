import { NextResponse } from "next/server";
import Medicine from "@/models/Medicine";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const medicine = await Medicine.create(body);

    return NextResponse.json(medicine);
  } catch (error) {
    console.log("error is: ", error);
    return NextResponse.json(
      { error: "Failed to create medicine" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const medicines = await Medicine.find().sort({ createdAt: -1 });

    return NextResponse.json(medicines);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch medicines" },
      { status: 500 }
    );
  }
}