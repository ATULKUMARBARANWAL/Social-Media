import express from 'express'
import PostController from './post.controller.js'
const postRouter = express.Router();
const PostControllerObj=new PostController();
postRouter.post('/createpost',(req,res,next)=>{
    PostControllerObj.createPost(req,res,next);
})
postRouter.get('/viewallposts',(req,res,next)=>{
    PostControllerObj.viewAllPosts(req,res,next);
})
postRouter.post('/deletepost/:postId',(req,res,next)=>{
    PostControllerObj.deleteOwnPost(req,res,next);
})
postRouter.get('/viewotherspost/:userId',(req,res,next)=>{
    PostControllerObj.viewOthersPost(req,res,next);
})
postRouter.put('/updatepost/:postId',(req,res,next)=>{
    PostControllerObj.updateOwnPost(req,res,next);
})
export default postRouter;