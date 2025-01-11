import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { AiOutlineComment } from "react-icons/ai";
import { URL } from "../url"; // Backend base URL
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { FaUserAlt } from 'react-icons/fa'; // Import the user icon
import { FaUserCircle } from "react-icons/fa";

const PostDetails = () => {
  const { id } = useParams(); // Post ID from the route
  const [post, setPost] = useState(null);
  const [userData, setUserData] = useState(null); // State to store user data
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(false);

  // Fetch user info from localStorage
  useEffect(() => {
    const userDataString = localStorage.getItem("userCredentials");
    if (userDataString) {
      const parsedUserData = JSON.parse(userDataString);
      setUserData(parsedUserData); // Store user data in state
    }
  }, [setUserData]);

  // Fetch post details
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${URL}/api/posts/${id}`);
        const data = await response.json();
        setPost(data);
      } catch (err) {
        console.error("Failed to fetch post", err);
      }
    };
    fetchPost();
  }, [id]);

  // Fetch comments for the post
  useEffect(() => {
    const fetchComments = async () => {
      if (userData) {
        try {
          const response = await fetch(`${URL}/api/comments/post/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${userData.token}`, // Send the token for authentication
            },
          });
          const data = await response.json();
          setComments(data); // Update state with fetched comments
        } catch (err) {
          console.error("Failed to fetch comments", err);
        }
      }
    };
    fetchComments();
  }, [id, userData]);

  // Handle new comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return; // Don't submit empty comments
    const userDataString = localStorage.getItem("userCredentials");
    const parsedUserData = JSON.parse(userDataString);
    try {
      const response = await fetch(`${URL}/api/comments/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${parsedUserData.token}`, // Send the token for authentication
        },
        body: JSON.stringify({
          comment: newComment,
          author: parsedUserData.username,
          postId: id,
          userId: parsedUserData._id,
        }),
      });
      const data = await response.json();
      setComments([...comments, data]); // Update comments
      setNewComment(""); // Clear input field
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };

  // Toggle like
  const toggleLike = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  const getRandomColor = () => {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#33A6FF', '#A633FF'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  
  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">
        {/* Post Details */}
        <div className="post-details bg-white shadow-md rounded-lg p-6 mb-8">
          
          <h1 className="text-6xl font-extrabold text-gray-900 mb-4">{post.title}</h1>

          <div className="text-gray-900 mb-4 flex text-center justify-self-center">
              <FaUserCircle
                className="text-gray-700 text-3xl cursor-pointer relative mr-2"
                 aria-label="Profile options"/>
              By <span className="font-semibold text-md text-gray-900 ml-1">{post.username}</span> <br />{" "}
          </div>

          <div className="flex  space-x-2 mt-5 mb-3 justify-center">
          <h3 className="mt-1 font-bold text-lg">Categories:  </h3>
    {post.categories.map((category, index) => (
      <div
        key={index}
        className="bg-black text-white px-4 py-2 rounded-xl border text-sm"
      >{category}
      </div>
    ))}
  </div>

  <img
  src={post.photo && (post.photo.startsWith("http") ? post.photo : `${URL}${post.photo}`)}
  alt="Post"
  className="w-3/4 h-64 object-fill rounded-sm mb-6 mx-12 sm:mx-36 sm:w-3/4 sm:h-96"
/>
          {/* Like and Comment Buttons */}
          <div className="flex items-center justify-center space-x-6">
            <button
              className="flex items-center text-gray-600 hover:text-red-500 transition-colors"
              onClick={toggleLike}
            >
              {liked ? (
                <BsHeartFill className="mr-2 text-red-500" />
              ) : (
                <BsHeart className="mr-2" />
              )}
              {liked ? "Liked" : "Like"}
            </button>
            <span className="flex items-center text-gray-900">
              <AiOutlineComment className="mr-2" />
              {comments.length} Comments
            </span>
          </div>
          <hr />
          <div className="text-lg text-gray-800 mb-6 mt-6" dangerouslySetInnerHTML={{ __html: post.desc }} />

          {/* Like and Comment Buttons */}
          <div className="flex items-center space-x-6">
            <button
              className="flex items-center text-gray-600 hover:text-red-500 transition-colors"
              onClick={toggleLike}
            >
              {liked ? (
                <BsHeartFill className="mr-2 text-red-500" />
              ) : (
                <BsHeart className="mr-2" />
              )}
              {liked ? "Liked" : "Like"}
            </button>
            <span className="flex items-center text-gray-900">
              <AiOutlineComment className="mr-2" />
              {comments.length} Comments
            </span>
          </div>
        </div>
        

        {/* Comments Section */}
<div className="comments">
  <h2 className="text-2xl font-bold mb-4">Comments</h2>
  {/* Add Comment */}
<form
  onSubmit={handleCommentSubmit}
  className="flex items-center bg-gray-50 rounded-full shadow-md w-full max-w-3xl mx-auto p-2 space-x-4"
>
  {/* Textarea for comment */}
  <textarea
    value={newComment}
    onChange={(e) => setNewComment(e.target.value)}
    placeholder="Write a comment..."
    className="w-full p-3 bg-gray-100 text-gray-700 rounded-full border border-gray-300 outline-none resize-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
    rows="1" // Adjust height as needed, keeping it thin and short
  />

  {/* Post Button */}
  <button
    type="submit"
    className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
  >
    Post
  </button>
</form>
  {/* Comments List */}
  {comments.length > 0 ? (
    comments.map((comment) => (
      <div key={comment._id} className="flex mb-2 space-x-2 items-start  bg-gray-50 rounded-md border border-black">
        {/* Comment's Author */}
        <div className="flex items-center space-x-3 w-32 mt-3">
          <FaUserAlt
            size={20}
            style={{ color: getRandomColor() }} // Random color for the user icon
            className="ml-2"
          />
          <div className="font-semibold text-gray-800">
            {comment.author}:
          </div>
        </div>
        {/* Comment's Text */}
        <div className="flex-1 p-3  text-left">
          {comment.comment}
        </div>
      </div>
    ))
  ) : (
    <p className="text-gray-500">No comments yet. Be the first to comment!</p>
  )}
 

</div>

      </div>
      <Footer />
    </div>
  );
};

export default PostDetails;
