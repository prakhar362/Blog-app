import React, { useState, useEffect } from "react";
import axios from "axios";

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {filteredBlogs.length > 0 ? (
        filteredBlogs.map((blog) => (
          <div
            key={blog._id}
            className="p-4 border rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-200"
          >
            {/* Blog Thumbnail */}
            {blog.photo && (
              <img
                src={blog.photo}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            )}

            {/* Blog Content */}
            <div className="mt-4">
              <h2 className="text-lg font-bold">{blog.title}</h2>
              <p className="text-sm text-gray-600">
                {blog.desc.length > 100
                  ? `${blog.desc.substring(0, 100)}...`
                  : blog.desc}
              </p>

              {/* Blog Meta Info */}
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500">
                  By {blog.username}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* Likes and Comments */}
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm font-bold text-blue-600">
                  {blog.likes || 0} Likes
                </span>
                <span className="text-sm font-bold text-green-600">
                  {blog.comments?.length || 0} Comments
                </span>
              </div>
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
