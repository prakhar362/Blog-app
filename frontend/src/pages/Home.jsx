import React, { useState } from "react";
import Navbar from "../components/navbar";
import Categories from "../components/Categories";
import HomePost from "../components/Homepost";
import Footer from '../components/footer';

function Home() {
  // State for selected categories
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Handle category selection (add/remove from selectedCategories)
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category) // Remove if already selected
        : [...prev, category] // Add if not selected
    );
  };

  return (
    <div>
      <Navbar />
      <hr />

      <div className="home-container flex">
        {/* Left-hand side: Categories */}
        <aside className="w-1/3 md:w-1/6 p-4 bg-gray-50 h-screen border-r-2">
  <Categories
    selectedCategories={selectedCategories}
    onCategoryChange={handleCategoryChange}
  />
</aside>


        {/* Right-hand side: Blog cards */}
        <main className="blog-cards-section w-full p-4">
          <HomePost selectedCategories={selectedCategories} />
        </main>
      </div>
      
      <Footer/>
    </div>
  );
}

export default Home;
