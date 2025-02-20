import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const url = process.env.DB_URL;

export const connectUsingMongoose = async () => {
    try {
        await mongoose.connect(url); // No need for extra options
        console.log("Connected to the database");
    } catch (err) {
        console.log("Error in connecting to the database");
        console.log(err);
    }
};
