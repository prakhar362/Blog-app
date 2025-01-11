const express = require("express");
const router = express.Router();
const Library = require("../models/library");

router.post("/add", async (req, res) => {
    const { username, userId, email, postId } = req.body;

    try {
        // Check if the post is already in the library
        const existingEntry = await Library.findOne({ userId, postId });
        if (existingEntry) {
            return res.status(400).json({ success: false, message: "Post already in library." });
        }

        // Add the post to the library
        const libraryEntry = new Library({ username, userId, email, postId });
        await libraryEntry.save();
        res.status(200).json({ success: true, message: "Post added to library!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error." });
    }
});

router.get("/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        // Find all library entries for the user
        const library = await Library.find({ userId }).populate("postId"); // Populate to get post details
        res.status(200).json({ success: true, library });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error." });
    }
});

router.post("/remove", async (req, res) => {
    const { userId, postId } = req.body;
  
    try {
      const existingEntry = await Library.findOneAndDelete({ userId, postId });
      if (!existingEntry) {
        return res.status(404).json({ success: false, message: "Post not found in library." });
      }
  
      res.status(200).json({ success: true, message: "Post removed from library!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error." });
    }
  });
  

module.exports = router;
