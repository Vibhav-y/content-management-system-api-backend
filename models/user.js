import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const  userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            // trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            select : false // Exclude password from query results by default
        },
        role: {
            type: String,
            enum: ["admin", "editor", "viewer"],
            default: "viewer"
        }
    },
    {timestamps: true}
);



userSchema.pre("save", async function (next) {
    // Only hash the password if it has been modified (or is new)
    //Prevents re-hashing the password if it hasn't changed
    if (!this.isModified("password")) {
        return next();
    }

    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
});

export default mongoose.model("User", userSchema);