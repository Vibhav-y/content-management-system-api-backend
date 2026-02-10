import mongoose from "mongoose";

const connectDB = async() =>{
    try{
        mongoose.set("runValidators", true);

        await mongoose.connect(process.env.MONGO_URI);

        console.log("DB ✅");

    }catch (error){
        console.log("DB ❌", error.message);
        process.exit(1);
    }
};

export default connectDB;
