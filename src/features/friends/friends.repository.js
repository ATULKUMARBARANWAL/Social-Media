import mongoose from "mongoose";
import { userSchema } from "../user/user.schema.js";
import { ApplicationError } from "../../Error-Handler/applicationError.js";
import { friendsSchema } from "./friends.schema.js";
const friendsModel=mongoose.model('Friend',friendsSchema)
export default class friendRepository{
    async addFriend(userId,friendId){
    {
        try{
               const newFriend=new friendsModel({userId,friendId});
               console.log("newFriend:",newFriend);
               const alreadyFriend=await friendsModel.findOne({userId,friendId})
               if(alreadyFriend)
                {
                    
                    throw new ApplicationError("Already friends",400)
                }  
                await newFriend.save();             

        }

        catch(err)
        {
            throw new ApplicationError("Error in adding friend",500)
        }
    }
    }
    async viewAllFriendReq(userId){
      try{
    
       const friendReq=await friendsModel.find({userId:userId,status:"pending"});
       console.log("friendReq:",friendReq);
       if(!friendReq)
       {
        
           throw new ApplicationError("No friend request",404)
       }
        return friendReq;
      }
      catch(err)
      {
          throw new ApplicationError("Error in viewing friend request",500)
      }
    }
   async viewAllFriend(userid){
        try{
            const friends=await friendsModel.find({userid:userid,status:"accepted"});
        
            if(!friends)
            {
                console.log("No friend found");
                throw new ApplicationError("No friends",404)
            }
            return friends;
        }
   
    catch(err)
    {
        throw new ApplicationError("Error in viewing all friends",500)
    }
}
async acceptFriendReq(userId,friendId){
    try{
        const friend=await friendsModel.findOne({userId,friendId});
        if(!friend)
        {
            
            throw new ApplicationError("No friend request found",404)
        }
        friend.status="accepted";
        await friend.save();
    }
    catch(err)
    {
        throw new ApplicationError("Error in accepting friend request",500)
    }
}
async rejectFriendReq(userId,friendId){
    try{
        const friend=await friendsModel.findOne({userId,friendId});
        if(!friend)
        {
            
            throw new ApplicationError("No friend request found",404)
        }
        friend.status="rejected";
        await friend.save();
    }
    catch(err)
    {
        throw new ApplicationError("Error in accepting friend request",500)
    }
}
async viewAllPerson(userId){
    try{
      const persons=await friendsModel.find({userId:userId});
      if(!persons)
      {
          throw new ApplicationError("No persons found",404)
      }
      else{
            return persons;
      }
    }
    catch(err)
    {
        throw new ApplicationError("Error in viewing all persons",500)
    }
}
}