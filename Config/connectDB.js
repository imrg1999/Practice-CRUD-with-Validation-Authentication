import mongoose from 'mongoose';
import dotenv from 'dotenv';

//dotenv Configuration
dotenv.config();

export const connectDB = async(req,res) => {
    try{
        const connection = await mongoose.connect(process.env.mongoURI);
        if(!connection) {
            console.log("DB isn't connected");
        } else{
            console.log("DB connected!");
        }  
    } catch(error) {
        console.log(error.message);
    }
}