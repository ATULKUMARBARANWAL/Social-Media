import mongoose from "mongoose";

export const friendsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    friendId:[{type:mongoose.Schema.Types.ObjectId,ref:"user"}],
    status:{type:String,default:"pending"},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now}
})
