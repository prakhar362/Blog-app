import React, { useState, useEffect } from "react";
import axios from "axios";
import { FcLike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";

const HomePost = ({ selectedCategories }) => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  // Fetch blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/posts");
        setBlogs(res.data); // Set fetched blogs
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };

    fetchBlogs();
  }, []);

  // Filter blogs based on selected categories
  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredBlogs(blogs); // Show all blogs if no category is selected
    } else {
      setFilteredBlogs(
        blogs.filter((blog) =>
          blog.categories.some((category) =>
            selectedCategories.includes(category)
          )
        )
      );
    }
  }, [selectedCategories, blogs]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 p-2">
    {filteredBlogs.length > 0 ? (
      filteredBlogs.map((blog) => (
        <div
          key={blog._id}
          className="p-4 border-b-2 border-b-gray-300 rounded-sm shadow-none bg-white hover:shadow-sm transition-shadow duration-200"
        >
          <div className="flex justify-between items-start">
            
  
            {/* Blog Content */}
            <div className="ml-6 flex flex-col justify-between w-full text-left">
              {/* Author and Title */}
              <div className="flex flex-col">
                <span className="text-lg text-gray-900">@{blog.username}</span>
                <h2 className="text-3xl font-bold mt-2">{blog.title}</h2>
              </div>
  
              {/* Blog Description */}
              <p className="text-sm text-gray-900 mt-2">
                {blog.desc.length > 100
                  ? `${blog.desc.substring(0, 120)}...Read more`
                  : blog.desc}
              </p>
  
              {/* Likes and Comments */}
              <div className="flex justify-start items-center mt-4 pr-8">
                <div className="flex items-center space-x-1">
                  <span className="text-md font-bold text-grey-900 flex">
                  <FcLike className="mt-1 mr-1"/> {blog.likes || 0}
                  </span>
                  
                  <span className="text-sm font-bold text-grey-900 flex ">
                  <FaRegComment className="mr-1 mt-1" /> {blog.comments?.length || 0}
                  </span>
                </div>
              </div>
            </div>
            {/* Blog Thumbnail */}
            {blog.photo && (
              <img
                src={blog.photo}
                alt={blog.title}
                className="w-64 h-36 object-cover rounded-sm -ml-44"
              />
            )}

          </div>
        </div>
      ))
    ) : (
      <p>No blogs found for the selected categories.</p>
    )}
  </div>
  
  );
};

export default HomePost;
