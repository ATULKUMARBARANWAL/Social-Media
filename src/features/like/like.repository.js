import mongoose from "mongoose";
import  likeSchema  from "./like.schema.js";
import { ApplicationError } from "../../Error-Handler/applicationError.js";

const likeModel = mongoose.model("Like", likeSchema);
export default class likeRepository {
   async addDeleteLike(userId, postId) {
      try {
         const like = await likeModel.findOne({ userId, postId });
         if(like)
         {
            await likeModel.deleteOne({userId,postId});
            return "Like deleted successfully";

         }
         const newLike=new likeModel({userId,postId});
         await newLike.save({ userId, postId });
         return "Like added successfully";
      }
      catch (err) {
         console.error("Error in adding like:", err);
         throw new ApplicationError("Error in adding like", 500);
      }
    }
}