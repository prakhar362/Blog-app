import React, { useState } from "react";
import { categories } from "../config";

const Categories = ({ selectedCategories, onCategoryChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Mobile Open/Close Button */}
      <button
        onClick={toggleSidebar}
        className="block md:hidden bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        {isOpen ? "Close Filters" : "Open"}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:static md:translate-x-0 md:block md:w-auto`}
      >
        <h3 className="text-xl font-bold p-4">Filter by Categories</h3>
        <ul className="space-y-2 p-4">
          {categories.map((category) => (
            <li key={category.id} className="flex items-center font-semibold">
              <input
                type="checkbox"
                id={category.name}
                value={category.name}
                checked={selectedCategories.includes(category.name)}
                onChange={() => onCategoryChange(category.name)}
                className="mr-2"
              />
              <label htmlFor={category.name} className="cursor-pointer">
                {category.name}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Categories;

