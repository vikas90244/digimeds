import { connectDB } from "@/lib/mongodb";
import { OTP, User } from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request){

    try {
        const {name, email, password} = await req.json();
        if(!name || !email || !password) {
            return NextResponse.json({
                success:false, 
                error: "missing required fields"
            },
            {status: 400});
        }

        await connectDB();
        const existingUser = await User.findOne({email});

        if(existingUser){
            return NextResponse.json({
                success: false,
                error: "email is already registered"
            }, 
            {status: 400});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name, 
            email,
            password:hashedPassword,
            isVerified:false,
        });
        const generatedCode = Math.floor(100000 + Math.random()*900000).toString();

        await OTP.create({
            email,
            code:generatedCode,
        });

        console.log(`[DEVELOPMENT ONLY] - OTP for ${email} is: ${generatedCode}`);
    return NextResponse.json(
        { success: true, message: "User created and OTP generated successfully." },
        { status: 201 }
        );

    } catch (error) {
        console.error("Registration Error:", error);
        return NextResponse.json({
            success:false,
            error:"something went wrong!"
        }, 
        {status:400});
    }
}