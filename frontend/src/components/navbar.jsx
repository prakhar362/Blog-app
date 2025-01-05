import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const { user } = useContext(UserContext);

  const showMenu = () => {
    setMenu((prev) => !prev);
  };

  // Function to handle search
  const handleSearch = () => {
    if (prompt.trim()) {
      navigate(`?search=${prompt}`);
    } else {
      navigate("/");
    }
  };

  // Function to handle Enter key press for search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex w-full items-center justify-between py-4 bg-black text-white">
      {/* Logo */}
      <h1 className="text-lg md:text-xl font-extrabold pl-6">
        <Link to="/">Blogosphere</Link>
      </h1>

      {/* Search Bar (Only on Home Page) */}
      {path === "/" && (
        <div className="flex justify-center items-center space-x-0">
          <input
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            className="outline-none px-3 text-black bg-white rounded-l-xl"
            placeholder="Search a post"
            type="text"
            onKeyDown={handleKeyDown} 
          />
          <button
            onClick={handleSearch}
            className="cursor-pointer p-1 bg-white text-black rounded-r-xl"
            aria-label="Search"
          >
            <BsSearch />
          </button>
        </div>
      )}

      {/* User Links */}
      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4 pr-6">
        {user ? (
          <h3>
            <Link to="/write">Write</Link>
          </h3>
        ) : (
          <h3>
            <Link to="/login">Login</Link>
          </h3>
        )}
        {user ? (
          <div onClick={showMenu}>
            <p className="cursor-pointer relative" aria-label="Menu">
              <FaBars />
            </p>
            {menu && <Menu />}
          </div>
        ) : (
          <h3>
            <Link to="/register">Register</Link>
          </h3>
        )}
      </div>

      {/* Mobile Menu */}
      <div onClick={showMenu} className="md:hidden text-lg pr-6">
        <p className="cursor-pointer relative" aria-label="Menu">
          <FaBars />
        </p>
        {menu && <Menu />}
      </div>
    </div>
  );
};

export default Navbar;
