import mongoose from "mongoose";
import {postSchema} from "./post.schema.js";
import {userSchema} from "../user/user.schema.js";
import {ApplicationError} from "../../Error-Handler/applicationError.js";
const postModel=mongoose.model('Post',postSchema)
export default class postRepository {
    async createPost(userId, content, image ) {
        console.log("userId:", userId);
        console.log("content:", content, "image:", image);
        try {
            console.log("Creating post for userId:", userId);

            // Ensure userId is a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                throw new ApplicationError("Invalid userId", 400);
            }
            
            const newpost = new postModel({
                userid: new mongoose.Types.ObjectId(userId),
                content,
                image
            });

            console.log("newpost:", newpost);
            await newpost.save();
        } catch (err) {
            console.error("Error creating post:", err);
            throw new ApplicationError("Error in creating post", 500);
        }
    }

    async viewAllPost(userId) {
        try {
            const posts = await postModel.find({ userid: userId }); // 🔥 FIX: Match field name
            if (!posts || posts.length === 0) {
                throw new ApplicationError("No posts found", 404);
            }
            const filterDeleted=posts.filter(post=>post.isDeleted===false);
           if(filterDeleted.length===0)
           {
                throw new ApplicationError("No posts found", 404);
           }
            return filterDeleted;
        } catch (err) {
            console.error("Error viewing posts:", err);
            throw new ApplicationError("Error in viewing all posts", 500);
        }
    }
    async deleteOwnPost(postId,userId){
        console.log("this is postId:",postId);
        console.log("this is userId:",userId);
        const post = await postModel.findOne({ _id: postId, userid: userId });
        if(!post){
            throw new ApplicationError("Post not found",404);
        }
        console.log("post:",post);
        post.isDeleted=true;
        post.save() 
    }
    async viewOthersPost(userId){   
     
            try {
                const posts = await postModel.find({ userid: userId }); // 🔥 FIX: Match field name
                if (!posts || posts.length === 0) {
                    throw new ApplicationError("No posts found", 404);
                }
                const filterDeleted=posts.filter(post=>post.isDeleted===false);
               if(filterDeleted.length===0)
               {
                    throw new ApplicationError("No posts found", 404);
               }
                return filterDeleted;
                
        }
        catch(err){
            console.error("Error viewing others posts:", err);
            throw new ApplicationError("Error in viewing others posts", 500);
        }
    
}
async updatePost(postId,userId,content,image){{
    console.log("this is postId:",postId);
    console.log("this is userId:",userId);
    const post =await postModel.updateOne({_id:postId,userid:userId},{$set:{content:content,image:image}},{upsert:true});
    if(!post){
        throw new ApplicationError("Post not found",404);
    }
    console.log("it is post baby post:",post);
   return post
}
}
}