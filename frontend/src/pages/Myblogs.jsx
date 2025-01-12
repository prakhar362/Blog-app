import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../url";
import Loader from "../components/loader";

const MyBlogs = () => {
  const { search } = useLocation();
  const navigate = useNavigate(); // For programmatic navigation
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userDataString = localStorage.getItem("userCredentials");
    if (userDataString) {
      const parsedUserData = JSON.parse(userDataString);
      setUserData(parsedUserData);
    }
  }, []);

  const fetchPosts = async () => {
    if (!userData) return;
    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/posts/user/${userData._id}`);
      setPosts(res.data);

      if (res.data.length === 0) {
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URL}/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      setPosts(posts.filter((post) => post._id !== id)); // Remove post from state
    } catch (err) {
      console.error("Failed to delete the post", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [userData, search]);

  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          posts.map((post) => (
            <div key={post._id} className="my-8 p-4 border border-gray-300 rounded-lg">
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="text-gray-700">{post.content}</p>

              {/* Display Likes */}
              <div className="mt-2">
                <span className="text-gray-600">Likes: {post.likes.length}</span>
              </div>

              {/* Display Comments */}
              <div className="mt-2">
                <span className="text-gray-600">Comments: {post.comments.length}</span>
              </div>

              <div className="mt-4 flex justify-between">
                <Link
                  to={userData ? `/Post/post/${post._id}` : "/login"}
                  className="text-blue-500"
                >
                  Read more
                </Link>
                <div>
                  <Link to={`/edit/${post._id}`} className="text-blue-500 mr-4">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h3 className="text-center font-bold mt-16">No posts available</h3>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyBlogs;
