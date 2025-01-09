const mongoose=require('mongoose')

const PostSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true,
        unique:true
    },
    photo:{
        type:String,
        required:false,
        
    },
    username:{
        type:String,
        required:true,  
    },
    userId:{
        type:String,
        required:true,  
    },
    categories:{
        type:Array,
        
    },
    likes: { type: Number, default: 0 }, // Add likes
    comments: { type: Array, default: [] }, // Add comments as an array of strings or objects
},{timestamps:true})

module.exports=mongoose.model("Post",PostSchema)