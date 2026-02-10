import mongoose from "mongoose";
import bcrypt from "bcrypt";

const otpSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        otp: {
            type: String,
            required: true,
        },
        expiresAt: {
            type: Date,
            required: true,
        },
    },
    {timestamps: true}
);

otpSchema.pre("save", async function (next) {
    // Only hash the OTP if it has been modified (or is new)
    //Prevents re-hashing the OTP if it hasn't changed
    if (!this.isModified("otp")) {
        return next();
    }

    const saltRounds = 10;
    this.otp = await bcrypt.hash(this.otp, saltRounds);
});

export default mongoose.model("OTP", otpSchema);