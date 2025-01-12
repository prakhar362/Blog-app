const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true,
    },
    bio:{
        type:String,
    },
    socialLinks: {
        facebook: {
            type: String,
            default: "", // Default to an empty string if not provided
        },
        twitter: { // For X (formerly Twitter)
            type: String,
            default: "",
        },
        instagram: {
            type: String,
            default: "",
        },
        linkedin: { // Optional addition
            type: String,
            default: "",
        },
        github: { // Optional addition for developers
            type: String,
            default: "",
        }
    }
},{timestamps:true}
)
module.exports=mongoose.model("User",UserSchema);