import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { URL } from "../url"; // Ensure the URL is imported correctly
import { IoIosLogOut } from "react-icons/io";
import { IoBookmarks } from "react-icons/io5";
import { LiaBlogSolid } from "react-icons/lia";
import { CgProfile } from "react-icons/cg";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar = ({ hideLogoOnMobile = false }) => {
  const [prompt, setPrompt] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false); // For mobile menu
  const [user, setUser] = useState(null); // Local state to hold user data
  const navigate = useNavigate();
  const path = useLocation().pathname;

  // Retrieve user data from localStorage
  useEffect(() => {
    const userDataString = localStorage.getItem("userCredentials");
    if (userDataString) {
      const parsedUserData = JSON.parse(userDataString);
      setUser(parsedUserData);
    }
  }, []);

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenu((prev) => !prev);
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
        credentials: "include",
      });
      setUser(null);
      localStorage.removeItem("userCredentials"); // Clear user from localStorage
      navigate("/login");
      console.log("LOGOUT SUCCESS");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <header className="flex items-center justify-between w-full py-3 px-5 bg-white shadow-sm">
      {/* Title - Hide on mobile only if hideLogoOnMobile is true */}
      <h1 className={`text-lg md:text-2xl font-bold ${hideLogoOnMobile ? 'hidden sm:block' : ''}`}>
        <Link to="/home">
          <img
            src="https://static.wixstatic.com/media/4a303c_4f2c44400e614f1d89c5914070037254~mv2.png/v1/fit/w_2500,h_1330,al_c/4a303c_4f2c44400e614f1d89c5914070037254~mv2.png"
            alt="Logo"
            className="w-full h-7 sm:w-full sm:h-10 "
          />
        </Link>
      </h1>

      {/* Hamburger Menu for Mobile */}
      <div className="flex w-full items-center justify-between md:hidden">
        {/* Logo on the left (already handled by parent) */}
        {path === "/home" ? (
          <>
            {/* Search Bar in the center on /home */}
            <div className="flex-1 flex items-center min-w-0 mx-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full min-w-0 px-4 py-2 bg-gray-100 rounded-l-xl outline-none"
                placeholder="Search a post"
              />
              <button
                onClick={handleSearch}
                className="px-3 py-3 bg-gray-100 text-gray-700 border-gray-200 rounded-r-lg"
                aria-label="Search"
              >
                <BsSearch />
              </button>
            </div>
            {/* Right side: Write button and Hamburger menu grouped */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              <Link
                to="/write"
                className="text-gray-700 text-2xl flex-shrink-0"
                aria-label="Write a blog"
              >
                <FiEdit className="mt-0" />
              </Link>
              <button onClick={toggleMobileMenu} className="text-2xl flex-shrink-0">
                {mobileMenu ? <AiOutlineClose /> : <AiOutlineMenu />}
              </button>
            </div>
          </>
        ) : (
          // No search bar: icons flush right
          <div className="flex-1 flex items-center justify-end">
            <div className="flex items-center space-x-2 flex-shrink-0">
              <Link
                to="/write"
                className="text-gray-700 text-2xl flex-shrink-0"
                aria-label="Write a blog"
              >
                <FiEdit className="mt-0" />
              </Link>
              <button onClick={toggleMobileMenu} className="text-2xl flex-shrink-0">
                {mobileMenu ? <AiOutlineClose /> : <AiOutlineMenu />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg p-4 md:hidden z-50">
          <ul className="space-y-4">
            {user && (
              <>
                <li>
                  <Link
                    to={`/profile/${user._id}`}
                    onClick={toggleMobileMenu}
                    className="flex items-center"
                  >
                    <CgProfile className="w-5 h-5 mr-2" />
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/library/${user._id}`}
                    onClick={toggleMobileMenu}
                    className="flex items-center"
                  >
                    <IoBookmarks className="w-5 h-5 mr-2" />
                    Library
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/myblogs/${user._id}`}
                    onClick={toggleMobileMenu}
                    className="flex items-center"
                  >
                    <LiaBlogSolid className="w-5 h-5 mr-2" />
                    My Blogs
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMobileMenu();
                    }}
                    className="flex items-center w-full"
                  >
                    <IoIosLogOut className="w-5 h-5 mr-2" />
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}

      {/* Search Bar for desktop */}
      {path === "/home" && (
        <div className="hidden md:flex items-center flex-1 mx-6">
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
            className="px-3 py-3 bg-gray-100 text-gray-700 border-gray-200 rounded-r-xl"
            aria-label="Search"
          >
            <BsSearch />
          </button>
        </div>
      )}

      {/* Icons for desktop */}
      <div className="hidden md:flex items-center space-x-6">
        {/* Write Icon */}
        <Link
          to="/write"
          className="text-gray-700 text-2xl"
          aria-label="Write a blog"
        >
          <FiEdit />
        </Link>

        {/* Profile Icon */}
        {user && (
          <div className="relative">
            <FaUserCircle
              className="text-gray-700 text-3xl cursor-pointer"
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
                    >
                      <CgProfile className="w-5 h-5 mr-2" />
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/library/${user._id}`}
                      className="flex px-4 py-2 hover:bg-gray-100"
                    >
                      <IoBookmarks className="w-5 h-5 mr-2" />
                      Library
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/myblogs/${user._id}`}
                      className="flex px-4 py-2 hover:bg-gray-100"
                    >
                      <LiaBlogSolid className="w-5 h-5 mr-2" />
                      My Blogs
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      <IoIosLogOut className="w-5 h-5 mr-2" />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
