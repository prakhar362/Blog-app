import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import Footer from "../components/Footer";
import Navbar from "../components/navbar";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { URL, IF } from "../url";
import Loader from "../components/Loader";
import { FcManager } from "react-icons/fc";

function Postdetails() {
  const { id: postId } = useParams();
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  
  const [comments, setComments] = useState([]); // Ensure comments is initialized as an array
  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const res = await axios.get(`${URL}/api/posts/${postId}`);
      setPost(res.data);
    } catch (err) {
      console.error("Error fetching post:", err);
    }
  };

  const fetchPostComments = async () => {
    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/comments/post/${postId}`);
      setComments(res.data || []); // Fallback to an empty array
    } catch (err) {
      console.error("Error fetching comments:", err);
      setComments([]); // Handle API failure gracefully
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchPostComments();
  }, [postId]);

  const postComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      alert("Comment cannot be empty.");
      return;
    }
    try {
        
      await axios.post(
        `${URL}/api/comments/create`,
        { comment, author: user?.username, postId, userId: user?._id },
        { withCredentials: true }
      );
      setComment(""); // Clear the input after posting
      fetchPostComments(); // Refresh comments
    } catch (err) {
        console.log(user?._id)
      console.error("Error posting comment:", err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-between mt-2 md:mt-4">
        <div className="flex">
          <FcManager className="text-2xl mr-2" />
          By {post.username || "Unknown"}
        </div>
        <div className="flex space-x-2">
          <p>{new Date(post.updatedAt || Date.now()).toDateString()}</p>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center">
        <img
          src={IF + post.photo || ""}
          className="object-cover h-[45vh] mx-auto mt-8"
          alt="Post Visual"
        />
        <p className="mx-auto mt-8 w-[80vh] border p-5 shadow-xl">{post.desc}</p>
        <div className="flex justify-center items-center mt-8 space-x-4 font-semibold">
          <p>Categories:</p>
          <div className="flex justify-center items-center space-x-2">
            {post.categories?.map((c, i) => (
              <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">
                {c}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center p-3 flex-col mt-4">
          <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
          {loader ? (
            <Loader />
          ) : comments.length > 0 ? (
            comments.map((c) => (
              <Comment className="" key={c._id} c={c} post={post} />
            ))
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </div>
        {/* Write a comment */}
        <div className="w-[90vh] border flex justify-center flex-col mt-4 md:flex-row">
          <input
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            type="text"
            placeholder="Write a comment"
            className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0"
          />
          <button
            onClick={postComment}
            className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0"
          >
            Add Comment
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Postdetails;
