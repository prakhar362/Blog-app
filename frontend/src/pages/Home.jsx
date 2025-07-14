import React, { useState } from "react";
import Navbar from "../components/navbar";
import Categories from "../components/Categories";
import HomePost from "../components/Homepost";
import Footer from "../components/footer";
import { FaFilter } from "react-icons/fa";

function Home() {
  // State for selected categories
  const [selectedCategories, setSelectedCategories] = useState([]);

  // State for sidebar visibility on mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Handle category selection (add/remove from selectedCategories)
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category) // Remove if already selected
        : [...prev, category] // Add if not selected
    );
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
        <Navbar hideLogoOnMobile />
      <hr />

      <div className="home-container flex">
        {/* Left-hand side: Categories (hidden on mobile) */}
        <aside
          className={`w-1/3 md:w-1/5 p-4 h-screen border-r-2 md:block ${
            isSidebarOpen ? "block" : "hidden"
          } fixed md:static z-50`}
        >
          <Categories
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
          />
        </aside>

        {/* Toggle Button for Mobile */}
        <button
          onClick={toggleSidebar}
          className="block md:hidden fixed  h-10 top-10 left-4 bg-gray-200 text-black px-4 py-2 rounded z-50 border border-black"
        >
         <FaFilter className="" />
        </button>

        {/* Right-hand side: Blog cards */}
        <main className="blog-cards-section w-screen p-4">
          <HomePost selectedCategories={selectedCategories} />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
