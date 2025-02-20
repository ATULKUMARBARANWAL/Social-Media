import mongoose from "mongoose";
export const commentSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    postId:{type:mongoose.Schema.Types.ObjectId,ref:"Post",required:true},
    content:{type:String,maxlength:600},
    isDeleted:{type:Boolean,default:false},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now}
})