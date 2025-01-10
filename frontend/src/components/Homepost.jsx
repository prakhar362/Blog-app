import React, { useState, useEffect } from "react";
import axios from "axios";
import { FcLike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";
import { Link } from "react-router-dom";

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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6 p-2">
      {filteredBlogs.length > 0 ? (
        filteredBlogs.map((blog) => (
          <Link
            key={blog._id}
            to={`/Post/post/${blog._id}`}
            className="block bg-white shadow-none rounded-sm overflow-hidden hover:shadow-md transition-shadow duration-300 w-full flex flex-col md:flex-row md:h-44 p-4 border-b-2 border-black"
          >
            {/* Blog Content */}
            <div className="flex flex-col justify-between text-left w-full md:w-2/3">
              {/* Author and Title */}
              <div className="mb-4">
                <span className="text-md text-gray-500">@{blog.username}</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2">{blog.title}</h2>
              </div>
  
              {/* Blog Description */}
              <p className="text-sm text-gray-700 mt-2">
                {blog.desc.length > 120
                  ? `${blog.desc.substring(0, 120)}...`
                  : blog.desc}
              </p>
  
              {/* Likes and Comments */}
              <div className="flex items-center mt-4 space-x-4">
                <div className="flex items-center space-x-1">
                  <FcLike className="mr-1" />
                  <span className="text-sm font-bold">{blog.likes || 0}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaRegComment className="mr-1" />
                  <span className="text-sm font-bold">{blog.comments?.length || 0}</span>
                </div>
              </div>
            </div>
  
            {/* Blog Thumbnail */}
            {blog.photo && (
              <img
                src={blog.photo}
                alt={blog.title}
                className="w-full h-40 object-fill rounded-t-sm mt-3 md:mt-0 md:w-1/4 md:h-36 md:object-fill md:rounded-sm md:ml-4"
              />
            )}
          </Link>
        ))
      ) : (
        <p className="text-center text-gray-500">
          No blogs found for the selected categories.
        </p>
      )}
    </div>
  );  
  
};

export default HomePost;
