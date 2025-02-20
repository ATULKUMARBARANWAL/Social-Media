import friendRepository from "./friends.repository.js";
import { ApplicationError } from "../../Error-Handler/applicationError.js";
export default class FriendsController {
    constructor(){

        this.friendRepository=new friendRepository();
        this.addFriend = this.addFriend.bind(this)
        this.viewAllFriendReq=this.viewAllFriendReq.bind(this);
        this.viewAllFriend=this.viewAllFriend.bind(this);
        this.acceptFriendReq=this.acceptFriendReq.bind(this);
    }
    async addFriend(req,res,next)
    {
   
        const {userId,friendId}=req.body;
        console.log("userid:",userId,"friendID:",friendId);
        try{
            await this.friendRepository.addFriend(userId,friendId);
            res.status(201).send("Fiend added successfully");
        }
        catch(err)
        {
            console.log("Error in adding friend",err);
            next(err);

        }

    }
    async viewAllFriendReq(req,res,next){
        const {userId}=req.body;
        try{
          const friendReq=await this.friendRepository.viewAllFriendReq(userId);
          if(!friendReq)
          {
              return res.status(404).send("No friend request");
          }
            res.status(200).send(friendReq);
        }
        catch(err)
        {
            console.log("Error in viewing friend request",err);
            next(err);
        }
    }
    async viewAllFriend(req,res,next){
        try{
            const {userid}=req.body;
            const friends=await this.friendRepository.viewAllFriend(userid);
            if(!friends)
            {
                return res.status(404).send("No friends");
            }
            res.status(201).send(friends);
    }
    catch(err)
    {
        console.log("Error in viewing all friends",err);
        next(err);
    }
}
async acceptFriendReq(req,res,next){
    const {userId,friendId}=req.body;
    try{
        await this.friendRepository.acceptFriendReq(userId,friendId);
        res.status(200).send("Friend request accepted");
    }
    catch(err)
    {
        console.log("Error in accepting friend request",err);
        next(err);
    }
}
async rejectFriendReq(req,res,next){
    const {userId,friendId}=req.body;
    try{
        await this.friendRepository.rejectFriendReq(userId,friendId);
        res.status(200).send("Friend request rejected");
    }
    catch(err)
    {
        console.log("Error in rejecting friend request",err);
        next(err);
    }
}
async viewAllPerson(req,res,next){
    try{
        const {userId}=req.body;
        const persons=await this.friendRepository.viewAllPerson(userId);
        if(!persons)
        {
            return res.status(404).send("No persons found");
        }
        res.status(200).send(persons);
    }
catch(err)
{
    console.log("Error in viewing all persons",err);
    next(err);
}
}
}