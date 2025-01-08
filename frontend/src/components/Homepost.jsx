import React from "react";

const HomePost = ({ selectedCategories }) => {
  const blogs = [
    { id: 1, title: "Tech Trends 2023", category: "Technology" },
    { id: 2, title: "Fitness Tips", category: "Health" },
    { id: 3, title: "E-Learning Platforms", category: "Education" },
    { id: 4, title: "Movie Reviews", category: "Entertainment" },
    { id: 5, title: "Football Updates", category: "Sports" },
  ];

  // Filter blogs based on selected categories
  const filteredBlogs =
    selectedCategories.length === 0
      ? blogs // Show all blogs if no category is selected
      : blogs.filter((blog) => selectedCategories.includes(blog.category));

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">
        {selectedCategories.length === 0
          ? "All Blogs"
          : ` (${selectedCategories.join(", ")})`}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <div key={blog.id} className="p-4 border rounded shadow">
              <h2 className="text-lg font-bold">{blog.title}</h2>
              <p className="text-sm text-gray-500">{blog.category}</p>
            </div>
          ))
        ) : (
          <p>No blogs found for the selected categories.</p>
        )}
      </div>
    </div>
  );
};

export default HomePost;
