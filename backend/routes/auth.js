const express=require('express');
const router=express.Router();
const User=require('../models/User');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');


//Register endpoint
router.post('/register', async(req,res)=>{
    try{
        const{username,email,password}=req.body;
        const salt=await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hashSync(password,salt);
        const newUser=new User({
            username,email,password:hashedpassword
        });
        const savedUser=await newUser.save();
        res.status(200).json(savedUser);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json(err);
    }
}
)

//LOGIN
router.post("/login",async (req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email})
    //    console.log(req.body)
        if(!user){
            return res.status(404).json("User not found!")
        }
        const match=await bcrypt.compare(req.body.password,user.password)
        
        if(!match){
            return res.status(401).json("Wrong credentials!")
        }
        const token = jwt.sign(
            { _id: user._id, username: user.username, email: user.email },
            process.env.SECRET,
            { expiresIn: "3d" }
          );
          
          // Log the token to check if it's generated
          console.log("Generated Token:", token);
          
          const { password, ...info } = user._doc;
          
          res
  .cookie("token", token, {
    httpOnly: true,
    secure: true, // Set to true if using HTTPS
    sameSite: "None", // Adjust based on your needs
  })
  .status(200)
  .json({ ...info, token }); // Include token in the response body
          
        

    }
    catch(err){
        res.status(500).json(err)
    } 
})


router.get("/logout", async (req, res) => {
    try {
      res
        .clearCookie("token", { sameSite: "none", secure: true })
        .status(200)
        .json({ message: "User logged out successfully!" });
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

//REFETCH USER
router.get("/refetch", (req,res)=>{
    const token=req.cookies.token
    jwt.verify(token,process.env.SECRET,{},async (err,data)=>{
        if(err){
            return res.status(404).json(err)
        }
        res.status(200).json(data)
    })
})



module.exports=router