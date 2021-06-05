const express=require("express");
const router=express.Router();
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const Admin= require("../modals/admin")

router.post("/signin",(req,res,next)=>{
    const {email,password}=req.body;
    var key=password.toString();
    Admin.findOne({email}).then(docs=>{
        if(!docs){
            return res.status(404).json({
                message:"User does not exist"
            })
        }
        bcrypt.compare(key,docs.password).then(result=>{
             if(!result){
               return res.status(400).json({
                   message:"invalid credential"
               })  
             }
             else if(result){
                 const token=jwt.sign({email:docs.email,id:docs._id},"value",{expiresIn:"1h"})
                 return res.status(200).json({user:docs,token:token})
             }
        })
        .catch(err=>{
           console.log(err)
           res.status(500).json({
               error:err
           })
       })
    })
   })
   
   
   router.post("/signup",(req,res,next)=>{
   const{email,password,name}=req.body;
   var key=password.toString();
   Admin.findOne({email}).then(docs=>{
       if(docs){
           return res.status(400).json({
               message:"User already exist"
           })
       }
      
       bcrypt.hash(key,12,(err,hash)=>{
           if(err){
               return res.status(500).json({
                   error:err
               })
           }
           else{
               const user=new Admin({
                   email,                
                   password:hash,
                   name
               })
               user.save()
               const token=jwt.sign({email:user.email,id:user._id},"value",{expiresIn:"1h"}) 
               res.status(200).json({
                   user,
                   token
               })
           }   
   
       })
       .catch(err=>{
           console.log(err)
           res.status(500).json({
               error:err
           })
       })    
   })
   })


module.exports=router;