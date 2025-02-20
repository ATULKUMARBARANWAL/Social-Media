import mongoose from "mongoose";
import { commentSchema } from "./comment.Schema.js";
import { ApplicationError } from "../../Error-Handler/applicationError.js";
const commentModel=mongoose.model('Comment',commentSchema)
export default class commentRepository{
   
    async addComment(userId,postId,content)
    {
        try{
       const commentModel=new commentModel({userId,postId,content})
       await commentModel.save();
         return commentModel;
        }
        catch(err)
        {
            console.log(err)
            throw new ApplicationError("Error in adding comment",500)
        }
    }
    async viewAllComment(postId){
        try{
        const comments=await commentModel.find({postId:postId});
        if(!comments)
        {
            throw new ApplicationError("No comments found",404)
        }
        return comments.map(comment=>comment.content);
        }
        catch(err)
        {
            throw new ApplicationError("Error in viewing all comments",500)
        }
    }
}