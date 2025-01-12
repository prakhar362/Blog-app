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
const libraryRoute=require('./routes/library');

const app = express();

//app.use(cors())
app.use(cors({
    origin: 'https://inkspire-ps.vercel.app', // Replace with the front-end URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
 




//middlewares
dotenv.config()
// Middleware to parse JSON
app.use(express.json());
app.use("/images",express.static(path.join(__dirname,"/images")))
console.log(cors())
app.use(cookieParser())
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/comments",commentRoute)
app.use("/api/library",libraryRoute)


const storage = multer.diskStorage({
    destination: (req, file, fn) => {
        // Set the destination folder for file uploads
        fn(null, "images"); // Make sure the "images" folder exists
    },
    filename: (req, file, fn) => {
        // Generate a unique filename
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        fn(null, uniqueSuffix + path.extname(file.originalname)); // Add the original file extension
    },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        console.log("Uploaded file info:", req.file);
        res.status(200).json({
            message: "Image has been uploaded successfully!",
            filePath: `/images/${req.file.filename}`, // Return the file path
        });
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ error: "Failed to upload image" });
    }
});



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