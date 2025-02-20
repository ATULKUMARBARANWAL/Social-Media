import likeRepository from "./like.repository.js";

export default class LikeController{
    constructor(){
        this.likeRepository=new likeRepository();
    }
    async addDeleteLike(req,res,next){
        const userId=req.user.userId;
        const postId=req.params.postId;
        try{
            const message=await this.likeRepository.addDeleteLike(userId,postId);
            res.status(200).send({message});
        }
        catch(err){
            next(err);
        }
    }
}
