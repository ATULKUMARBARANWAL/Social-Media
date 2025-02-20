import express from 'express';
import mongoose from 'mongoose';
import { connectUsingMongoose } from './src/config/mongooseConfig.js';
import userRouter from './src/features/user/user.routes.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import friendsRouter from './src/features/friends/friends.router.js';
import postRouter from './src/features/post/post.routes.js';
import likeRouter from './src/features/like/like.router.js';
const server=express();

server.use(express.json());
server.use('/api/user',userRouter);
server.use('/api/friends',jwtAuth,friendsRouter);
server.use('/api/post',jwtAuth,postRouter);
server.use('/api/like',jwtAuth,likeRouter);
server.listen(3000,()=>{
    console.log('Server is running on http://localhost:3000');
    connectUsingMongoose()
})