import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { URL } from "../url"; // Make sure the URL is imported correctly
import { IoIosLogOut } from "react-icons/io";
import { IoBookmarks } from "react-icons/io5";
import { LiaBlogSolid } from "react-icons/lia";
import { CgProfile } from "react-icons/cg";
const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const { user, setUser } = useContext(UserContext); // Access user and setUser from UserContext


  // Toggle dropdown menu
  const toggleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  // Handle search
  const handleSearch = () => {
    if (prompt.trim()) {
      navigate(`?search=${prompt}`);
    } else {
      navigate("/home");
    }
  };

  // Handle Enter key for search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await fetch(`${URL}/api/auth/logout`, {
        method: "GET",
        credentials: "include", // Include credentials for authentication
      });
      setUser(null); // Clear the user state in context
      navigate("/login"); // Redirect to login page
      console.log("LOGOUT SUCCESS")
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
  return (
    <header className="flex items-center justify-between w-full py-3 px-7 bg-white shadow-sm">
      {/* Title */}
      <h1 className="text-xl font-bold">
        <Link to="/home">Blogosphere</Link>
      </h1>

      {/* Search Bar */}
{path === "/home" && (
  <div className="flex items-center flex-1 mx-32">
    <input
      type="text"
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      onKeyDown={handleKeyDown}
      className="flex-1 px-4 py-2 bg-gray-100 rounded-l-xl outline-none"
      placeholder="Search a post"
    />
    <button
      onClick={handleSearch}
      className="px-3 py-3 bg-gray-100 text-gray-700  border-gray-200 rounded-r-xl"
      aria-label="Search"
    >
      <BsSearch />
    </button>
  </div>
)}


     {/* Icons */}
<div className="flex items-center space-x-6">
  {/* Write Icon */}
  <Link
    to="/write"
    className="text-gray-700 text-2xl" // Increased size to `text-2xl`
    aria-label="Write a blog"
  >
    <FiEdit />
  </Link>

  {/* Profile Icon */}
  <div className="relative">
    <FaUserCircle
      className="text-gray-700 text-3xl cursor-pointer" // Increased size to `text-3xl`
      onClick={toggleDropdown}
      aria-label="Profile options"
    />
    {dropdown && (
      <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-md rounded-md">
        <ul className="flex flex-col">
          <li>
            <Link
              to={`/profile/${user._id}`}
              className="flex px-4 py-2 hover:bg-gray-100"
            ><CgProfile className="w-6 h-6 mr-2" />
              MyProfile
            </Link>
          </li>
          <li>
            <Link
              to="/library"
              className="flex px-4 py-2 hover:bg-gray-100 text-base"
            >
              <IoBookmarks className="w-5 h-5 mr-3" /> Library
            </Link>
          </li>
          <li>
            <Link
              to="/myblogs"
              className="flex px-4 py-2 hover:bg-gray-100"
            >
              <LiaBlogSolid className="w-6 h-6 mr-2" />
              MyBlogs
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="flex w-full text-left px-4 py-2 hover:bg-gray-100"
            >
            <IoIosLogOut className="w-6 h-6 mr-3" /> Logout
            </button>
          </li>
        </ul>
      </div>
    )}
  </div>
</div>

    </header>
  );
};

export default Navbar;
