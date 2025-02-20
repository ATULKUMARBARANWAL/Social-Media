import mongoose from 'mongoose';
import { userSchema } from './user.schema.js';
import { ApplicationError } from '../../Error-Handler/applicationError.js';

const userModel=mongoose.model('user',userSchema)
export default class UserRepository{
    async signUp(user){
        try{
const newUser=new userModel(user)
await newUser.save();
return newUser;
        }
        catch(err)
        {
            console.log(err)
            throw new ApplicationError("Error in signing up",500)
        }
    }
    async getUserByEmail(email){
        try{
            const user=await userModel.findOne({email:email});
            console.log(user)
            return user;
    }
    catch(err){
        throw new ApplicationError("Error in getting user by email",500)
    }
}
async signIn(email,password){
    try{
       return await userModel.findOne({email,password});
    }
    catch(err)
    {
        throw new ApplicationError("Some error occured",500)
    }
}
}