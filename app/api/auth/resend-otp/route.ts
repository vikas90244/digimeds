import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { OTP, User } from "@/models/User";
import { sendOTPEmail } from "@/lib/mail";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
        }

        await connectDB();

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
        }

        if (user.isVerified) {
            return NextResponse.json({ success: false, error: "Account is already verified" }, { status: 400 });
        }

        // --- THE RATE LIMITER ---
        const now = new Date();
        if (user.otpLockedUntil && now < user.otpLockedUntil) {
            const minutesLeft = Math.ceil((user.otpLockedUntil.getTime() - now.getTime()) / 60000);
            return NextResponse.json({ 
                success: false, 
                error: `Too many attempts. Please try again in ${minutesLeft} minutes.` 
            }, { status: 429 }); 
        }

        if (user.otpLockedUntil && now >= user.otpLockedUntil) {
            user.otpSendCount = 0;
            user.otpLockedUntil = null;
        }

        await OTP.deleteMany({ email });

        const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
        
        await OTP.create({
            email,
            code: generatedCode,
        });

        user.otpSendCount += 1;
        
        if (user.otpSendCount >= 3) {
            user.otpLockedUntil = new Date(Date.now() + 60 * 60 * 1000);
        }
        
        await user.save();

        // console.log(`[RESEND] - Fresh OTP for ${email} is: ${generatedCode}`);
        await sendOTPEmail(email, generatedCode);
        
        return NextResponse.json({ success: true, message: "New code sent successfully!" }, { status: 200 });

    } catch (error) {
        console.error("Resend OTP Error:", error);
        return NextResponse.json({ success: false, error: "Failed to resend code" }, { status: 500 });
    }
}