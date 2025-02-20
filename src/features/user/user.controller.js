import { combineSlices } from "@reduxjs/toolkit";
import UserRepository from "./user.repository.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export default class UserController {
    constructor() {
        this.UserRepository = new UserRepository();
    }
    async signup(req,res,next){
       
        const {name,email,password}=req.body;
      
        try{
const hashedPassword=await bcrypt.hash(password,12);

const user=await this.UserRepository.signUp({name,email,password:hashedPassword});
res.status(201).json(user);

        }
        catch(err){
            next(err)
        }
    }
    async signin(req,res,next)  {
    const {email,password}=req.body;
    try{
   const user=await this.UserRepository.getUserByEmail(email);
 if(!user){
     return res.status(404).json({message:"User not found"});
    }
   const result=await bcrypt.compare(password,user.password);
   if(!result)
   {

return res.status(400).send({message:"Invalid password"});
   }
 else{
    const token=jwt.sign({
        userId:user._id,
        email:user.email
    },
    process.env.JWT_SECRET,
{
expiresIn:'1h'
})
res.status(200).json({token});
 }
}
    catch(err){
        console.log(err);
        return res.status(500).send("Something went wrong");
    }
}
}