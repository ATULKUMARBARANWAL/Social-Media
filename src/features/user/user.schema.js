import mongoose from 'mongoose';
export const userSchema = new mongoose.Schema({
    name:{type:String,required:true,maxLength:[32,"Name is too long"]},
    email:{type:String,unique:true,required:true,maxLength:[32,"Email is too long"],match: [/.+\@.+\../, "Please enter a valid email"]},
    password:{type:String,required:true,minLength:[6,"Password is too short"]},
});