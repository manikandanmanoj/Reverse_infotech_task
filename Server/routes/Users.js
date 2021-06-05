const express=require("express");
const router=express.Router();
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const User= require("../modals/user")


router.post("/signin",(req,res,next)=>{
    const {email,password}=req.body;
    var key=password.toString();
    User.findOne({email}).then(docs=>{
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
                 const token=jwt.sign({email:docs.email,id:docs._id},"secretKey",{expiresIn:"1h"})
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
   User.findOne({email}).then(docs=>{
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
               const user=new User({
                   email,                
                   password:hash,
                   name
               })
               user.save()
               const token=jwt.sign({email:user.email,id:user._id},"secretKey",{expiresIn:"1h"}) 
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

router.get("/get",(req,res,next)=>{
    User.find().then(result=>{
        res.status(200).json(result)
    })
})

router.post("/id",(req,res,next)=>{
    User.find({_id:req.body._id}).then(result=>{
        res.status(200).json(result)
    })
})


router.put("/activate",(req,res,next)=>{    
    var update= User.update({_id:req.body._id},{$set:{
        active:true
    }})
    .then(result=>{
        console.log(result)
    }).catch(err=>{
        console.log(err)
    })
    res.status(200).json(update)
})


router.put("/deactivate",(req,res,next)=>{    
    var update= User.update({_id:req.body._id},{$set:{
        active:false
    }})
    .then(result=>{
        console.log(result)
    }).catch(err=>{
        console.log(err)
    })
    res.status(200).json(update)
})

module.exports=router;