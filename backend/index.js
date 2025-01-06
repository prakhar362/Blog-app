const express = require("express");
require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");
const cors=require('cors')
const path=require('path');
const dotenv=require('dotenv');
const cookieParser=require('cookie-parser')
const multer=require('multer')


const authRoute=require('./routes/auth')
const userRoute=require('./routes/user')
const postRoute=require('./routes/posts')
const commentRoute=require('./routes/comments')

const app = express();

app.use(cors())
const corsOptions = {
    origin: '*',
    credentials: true,
  };
  
  app.use(cors(corsOptions));



//middlewares
dotenv.config()
app.use(express.json())
app.use("/images",express.static(path.join(__dirname,"/images")))
console.log(cors())
app.use(cookieParser())
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/comments",commentRoute)

//image upload
const storage=multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
        // fn(null,"image1.jpg")
    }
})

const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    // console.log(req.body)
    res.status(200).json("Image has been uploaded successfully!")
})


const port=process.env.PORT;
async function main()
{
    try{
        //using dotenv
    const mongourl=process.env.MONGO_URL;
    await mongoose.connect(mongourl);
    // Start the server
    console.log("conneted to MongoDb Server")
 app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
    }
    catch(error)
    {
        console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process if the DB connection fails
    }
    
}
main();