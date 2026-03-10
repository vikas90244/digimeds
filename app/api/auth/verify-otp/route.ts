import { connectDB } from "@/lib/mongodb";
import { OTP, User } from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try {
        const {email, code} = await req.json();
         
        if(!email || !code) {
            return NextResponse.json({
                success:false, 
                error:"Missing email or code"
            }, {status:400});
        }
        await connectDB();

        const validOTP = await OTP.findOne({email, code});
       

        if(!validOTP){
            return NextResponse.json({
                success: false,
                error:"Code invalid or expired! "
            }, 
        {status: 400});
        }
        const user = await User.findOne({ email });

        if(!user){
            return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
        }

        if(user.isVerified){
            return NextResponse.json({ success: false, error: "User is already verified" }, { status: 400 });
        }
        
        user.isVerified = true;
        await user.save();
       
        await OTP.deleteOne({_id: validOTP._id});
        return NextResponse.json({ success: true, message: "Account verified successfully!" }, { status: 200 });
    } catch (error) {
        console.error("Verification Error:", error);
        return NextResponse.json({ success: false, error: "Something went wrong verifying the code" }, { status: 500 });
    }
}