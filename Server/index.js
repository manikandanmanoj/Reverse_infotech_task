const express=require("express");
const app=express();
const mongoose=require("mongoose")
const morgan=require("morgan")
const cors=require("cors")
const env= require("dotenv")
// const fileUpload=require("express-fileupload")
const bodyParser=require("body-parser")



// middleware 
app.use(morgan("dev"))

// neglect the cors problem
app.use(cors())
app.use(express.json());
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
// app.use(fileUpload())
env.config();


// server port 
app.listen(3000,()=>{
    console.log(`server started at 3000`)
})

// image uploading folder
app.use(express.static("uploads"))

// Router
const adminRoute=require("./routes/Admin")
const userRoute=require("./routes/Users")

app.use("/users",userRoute)
app.use("/admin",adminRoute)

// Db connection 
mongoose.connect('mongodb://localhost:27017/Reverse', {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true },(err)=>{
    if(!err){
        console.log("Db successfully")
    }
});
mongoose.set("useFindAndModify",false)

