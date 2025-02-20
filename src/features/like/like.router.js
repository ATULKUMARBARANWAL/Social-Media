import express from "express"
import LikeController from './like.controller.js'
const likeRouter=express.Router();
const likeController=new LikeController();
likeRouter.post('/adddeletelike/:postId',likeController.addDeleteLike.bind(likeController));
export default likeRouter;