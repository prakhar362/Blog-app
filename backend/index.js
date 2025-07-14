const express = require("express");
require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");
const cors=require('cors')
const path=require('path');
const dotenv=require('dotenv');
const cookieParser=require('cookie-parser')
const multer=require('multer')
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


const authRoute=require('./routes/auth')
const userRoute=require('./routes/user')
const postRoute=require('./routes/posts')
const commentRoute=require('./routes/comments')
const libraryRoute=require('./routes/library');

const app = express();

// CORS Configuration
const corsOptions = {
    origin: [ 'https://inskpire.vercel.app','http://localhost:5173' ], // Frontend domain
    credentials: true, // Allow cookies and credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    optionSuccessStatus: 200, // Optional: For older browsers
  };
  
  // Ensure OPTIONS preflight requests are handled
  app.options('*', cors(corsOptions)); // Preflight for all routes
 app.use(cors(corsOptions)) // Use this after the variable declaration

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

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'blog_images', // Cloudinary folder name
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    // The uploaded file info is in req.file
    res.status(200).json({
      message: "Image has been uploaded successfully!",
      filePath: req.file.path, // This is the Cloudinary URL
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