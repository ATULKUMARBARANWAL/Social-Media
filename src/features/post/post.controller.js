import postRepository from "./post.repository.js"
export default class PostController{
    constructor(){
        this.postRepository=new postRepository();
    }
    async createPost(req,res,next){
        const userId=req.user.userId;
        const {content,image}=req.body;
        console.log("userId:",userId);
        console.log("content:",content,"image:",image);
        try{
            await this.postRepository.createPost(userId,content,image);
            res.status(201).json({message:"Post created successfully"});
        }
        catch(err){
            next(err);
        }
    }
    async viewAllPosts(req,res,next)
    {
        const userId=req.user.userId;
        try{
         const posts=await this.postRepository.viewAllPost(userId);
         if(!posts || posts.length===0)
         {
             res.status(404).send({message:"No posts found"});
         }
            res.status(200).send(posts);
        }
        catch(err){
            next(err);
        }
    }
    async deleteOwnPost(req,res,next){
        const userId=req.user.userId;
        const postId=req.params.postId;
        console.log("postId:",postId);
        try{
            await this.postRepository.deleteOwnPost(postId,userId);
            res.status(200).send({message:"Post deleted successfully"});
        }
        catch(err){
            next(err);
        }
    }
async viewOthersPost(req,res,next){
    
      const userId=req.params.userId;   
      try{
      const posts= await this.postRepository.viewOthersPost(userId);
      if(!posts || posts.length===0)
      {
            res.status(404).send({message:"No posts found"});
      }
       res.status(200).send({message:"Posts viewed successfully"});
    }
    catch{
       next(err);
    }
}
async updateOwnPost(req,res,next){
    const userId=req.user.userId;
    const postId=req.params.postId;
    const {content,image}=req.body;
    try{
const updatePost =await this.postRepository.updatePost(postId,userId,content,image);
res.status(200).send({message:"Post updated successfully"})
    }
    catch(err){
        next(err);
}
}
}