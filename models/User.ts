import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String, required:true}, 
    email:{type:String, unique:true, required:true}, 
    password:{type:String, required:true}, 
    isVerified:{type:Boolean, default:false}
});

const otpSchema = new mongoose.Schema({
    email:{type: String, required:true}, 
    code: {type: String , required:true}, 
    createdAt:{type: Date, default:Date.now, expires:300 }
})

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const OTP = mongoose.models.OTP || mongoose.model("OTP", otpSchema);