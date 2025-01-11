const mongoose = require("mongoose");

const LibrarySchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post", // Reference to the Post model
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Library", LibrarySchema);
