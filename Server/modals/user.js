const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    
  
    active:{
        type:Boolean,
        default:null
    }
})

module.exports=mongoose.model("user",userSchema)