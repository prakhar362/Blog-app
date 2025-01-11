import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // React Quill's styles
import Select from "react-select"; // For multi-category selection
import axios from "axios";
import { categories } from "../config/index"; // Import categories
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { URL } from "../url";

const BlogPostCreator = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState(""); // Blog content
  const [photo, setPhoto] = useState(null); // Thumbnail image
  const [selectedCategories, setSelectedCategories] = useState([]); // Selected categories
  const [userData, setUserData] = useState(null); // State to store user data

  // Fetch user info from localStorage
 // Fetch user info from localStorage
   useEffect(() => {
     const userDataString = localStorage.getItem("userCredentials");
     if (userDataString) {
       const parsedUserData = JSON.parse(userDataString);
       console.log("User Cred coming Create blog: ",parsedUserData)
       console.log("User Token: ",parsedUserData.token)
       setUserData(parsedUserData); // Store user data in state
       console.log("User data Token: ",userData.token);
     }
   }, [setUserData]);
  // Transform categories for react-select
  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  // Upload image to backend
  const uploadImage = async () => {
    if (!photo) return null;
    const formData = new FormData();
    formData.append("file", photo);
    formData.append("img", Date.now() + photo.name); // Unique image name

    try {
      const res = await axios.post(`${URL}/api/upload`, formData);
      return res.data; // Image upload response
    } catch (err) {
      console.error("Image upload failed:", err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!userData.username || !userData._id || !userData.token) {
      alert("User is not logged in or token is missing. Please log in to create a blog post.");
      return;
    }
  
    // Upload photo first
    const uploadedPhoto = await uploadImage();
    if (!uploadedPhoto) {
      alert("Failed to upload image.");
      return;
    }
  
    const blogData = {
      title,
      desc,
      photo: uploadedPhoto,
      username: userData.username,
      userId: userData._id,
      categories: selectedCategories.map((cat) => cat.value), // Only category IDs
      likes: 0, // Add likes
      comments: [], // Initialize comments as an empty array
    };
  
    try {
      const res = await fetch(`${URL}/api/posts/create`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
          "Authorization": `Bearer ${userData.token}`, // Include the authentication token
        },
        body: JSON.stringify(blogData),
      });
  
      if (!res.ok) {
        const error = await res.json(); // Parse error response
        throw new Error(error.message || "Failed to create blog post.");
      }
  
      const data = await res.json(); // Parse success response
      alert("Blog created successfully!");
      console.log("Saved blog post:", data);
  
      // Reset form
      setTitle("");
      setDesc("");
      setPhoto(null);
      setSelectedCategories([]);
    } catch (err) {
      console.error("Failed to create blog:", err.message);
      alert(`Failed to create blog: ${err.message}`);
    }
  };


  return (
    <div>
      <Navbar/>
    
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Create Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block font-medium mb-2">
            Blog Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full"
            placeholder="Enter blog title"
            required
          />
        </div>

        {/* Thumbnail */}
        <div>
          <label htmlFor="photo" className="block font-medium mb-2">
            Thumbnail Image
          </label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        {/* Categories */}
        <div>
          <label htmlFor="categories" className="block font-medium mb-2">
            Select Categories
          </label>
          <Select
            id="categories"
            options={categoryOptions}
            value={selectedCategories}
            onChange={setSelectedCategories}
            isMulti
            placeholder="Select categories"
          />
        </div>

        {/* Blog Content */}
        <div>
          <label htmlFor="desc" className="block font-medium mb-2">
            Blog Content
          </label>
          <ReactQuill
            theme="snow"
            value={desc}
            onChange={setDesc}
            className="h-64"
            placeholder="Write your blog content here..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Publish Blog Post
          </button>
        </div>
      </form>
    </div>
    <Footer/>
    </div>
  );
};

export default BlogPostCreator;
