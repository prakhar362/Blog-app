const express = require("express");
require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");
const cors=require('cors')
const app = express();

app.use(cors())
const corsOptions = {
    origin: '*',
    credentials: true,
  };
  
  app.use(cors(corsOptions));

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