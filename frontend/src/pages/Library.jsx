import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../url";
import Loader from "../components/Loader";

const Library = () => {
  const navigate = useNavigate();
  const [library, setLibrary] = useState([]); // Ensure library is an array
  const [loader, setLoader] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [userData, setUserData] = useState(null);

  // Fetch user data from localStorage
  useEffect(() => {
    const userDataString = localStorage.getItem("userCredentials");
    if (userDataString) {
      const parsedUserData = JSON.parse(userDataString);
      setUserData(parsedUserData);
    }
  }, []);

  // Fetch library items for the user
  const fetchLibrary = async () => {
    if (!userData) return;
    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/library/${userData._id}`);
      console.log("Fetched library data:", res.data); // Log the response
      const fetchedLibrary = Array.isArray(res.data.library) ? res.data.library : [];
      setLibrary(fetchedLibrary);

      if (fetchedLibrary.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setLoader(false);
    } catch (err) {
      console.error(err);
      setLoader(false);
    }
  };

  // Handle deletion of an item from the library
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URL}/api/library/${id}`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      setLibrary(library.filter((item) => item._id !== id)); // Remove item from state
    } catch (err) {
      console.error("Failed to delete the item", err);
    }
  };

  useEffect(() => {
    fetchLibrary();
  }, [userData]);

  return (
    <div>
      <Navbar />
      <div className="px-8  md:px-[200px] min-h-[80vh] mt-5">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          Array.isArray(library) && library.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {library.map((item) => (
                <div
                  key={item._id}
                  className="p-6 bg-white border border-gray-900 rounded-md shadow-lg transform transition-transform hover:scale-105"
                >
                  <h2 className="text-2xl font-semibold text-gray-800">{item.postId.title}</h2>
                  <p className="text-gray-600 text-sm">Added by: {item.username}</p>
                  <p className="text-gray-600 text-sm">Email: {item.email}</p>
                  <p className="text-gray-500 text-sm">
                    Added On: {new Date(item.createdAt).toLocaleString()}
                  </p>

                  <div className="mt-6 flex justify-between items-center">
                    <Link
                      to={userData ? `/Post/post/${item.postId._id}` : "/login"}
                      className="text-blue-500 hover:underline transition duration-200"
                    >
                      View Post
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 hover:underline transition duration-200"
                    >
                      Remove from Library
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h3 className="text-center font-bold mt-16 text-gray-600">No items in your library</h3>
          )
        ) : (
          <h3 className="text-center font-bold mt-16 text-gray-600">No items in your library</h3>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Library;
