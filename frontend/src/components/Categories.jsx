import React from "react";
import { categories } from "../config";

const Categories = ({ selectedCategories, onCategoryChange }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Filter by Categories</h3>
      <ul className="space-y-2">
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
  );
};

export default Categories;
