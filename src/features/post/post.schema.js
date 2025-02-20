import mongoose from "mongoose";
export  const postSchema=new mongoose.Schema({
    userid:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    content:{type:String,maxlength:600},
    image:{type:String,default:null},
    visibility:{type:String,enum:["public","private"],default:"public"},
    postType:{type:String,enum:["text","image","video"],default:"text"},
    sharedPost:{type:mongoose.Schema.Types.ObjectId,ref:"Post",default:null},
    likeCount:{type:Number,default:0},
    commentCount:{type:Number,default:0},
    isDeleted:{type:Boolean,default:false},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now}
})