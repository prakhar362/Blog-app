import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { AiOutlineComment, AiOutlineShareAlt } from "react-icons/ai";
import { URL } from "../url"; // Backend base URL
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { FaUserAlt } from 'react-icons/fa'; // Import the user icon
import { FaUserCircle, FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa"; // Additional icons for social media

const PostDetails = () => {
  const { id } = useParams(); // Post ID from the route
  const [post, setPost] = useState(null);
  const [userData, setUserData] = useState(null); // State to store user data
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [author, setAuthor] = useState(null); // State to store author details

  // Fetch user info from localStorage
  useEffect(() => {
    const userDataString = localStorage.getItem("userCredentials");
    if (userDataString) {
      const parsedUserData = JSON.parse(userDataString);
      setUserData(parsedUserData); // Store user data in state
    }
  }, [setUserData]);

  // Fetch post details and author details
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${URL}/api/posts/${id}`);
        const data = await response.json();
        setPost(data);

        // Fetch author details using the post's userId (assuming userId refers to the author)
        const authorResponse = await fetch(`${URL}/api/users/${data.userId}`);
        const authorData = await authorResponse.json();
        setAuthor(authorData); // Set author details
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
  const toggleLike = async () => {
    setLiked((prevLiked) => !prevLiked);

    try {
      if (!liked) {
        // Add post to library
        const response = await fetch(`${URL}/api/library/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userData._id,
            username: userData.username,
            email: userData.email,
            postId: id,
          }),
        });

        const result = await response.json();
        if (result.success) {
          console.log("Post added to library!");
        } else {
          console.error(result.message);
          setLiked(false); // Revert UI change if failed
        }
      } else {
        // Remove post from library
        const response = await fetch(`${URL}/api/library/remove`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userData._id,
            postId: id,
          }),
        });

        const result = await response.json();
        if (result.success) {
          console.log("Post removed from library!");
        } else {
          console.error(result.message);
          setLiked(true); // Revert UI change if failed
        }
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      setLiked(!liked); // Revert UI change if an error occurs
    }
  };

  const getRandomColor = () => {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#33A6FF', '#A633FF'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  // Share post
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Post link copied to clipboard!");
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
    <Navbar />
    <div className="container mx-auto mt-10 p-3 gap-14">
      {/* Responsive Flex Container */}
      <div className="flex flex-col md:flex-row md:space-x-6">
        {/* Left Side: Post Content */}
        <div className="post-details bg-white shadow-lg rounded-lg w-full p-6 mb-8 border border-black">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{post.title}</h1>
  
          <div className="text-gray-900 mb-4 flex items-center justify-center">
            <FaUserCircle className="text-gray-700 text-3xl cursor-pointer mr-2" />
            By <span className="font-semibold text-md text-gray-900 ml-1">{post.username}</span>
          </div>
  
          <div className="flex space-x-2 mt-5 mb-3 justify-center items-center">
            <h3 className="font-bold text-lg ">Categories: </h3>
            {post.categories.map((category, index) => (
              <div key={index} className="bg-black text-white px-4 py-2 rounded-xl text-sm">
                {category}
              </div>
            ))}
          </div>
  
          <img
            src={post.photo && (post.photo.startsWith("http") ? post.photo : `${URL}${post.photo}`)}
            alt="Post"
            className=" sm:w-3/4 h-72 object-fill rounded-sm mb-6 mx-auto"
          />
  
          {/* Like and Comment Buttons */}
          <div className="flex items-center justify-start space-x-6 mb-6">
            <button
              className="flex items-center text-gray-600 hover:text-red-500 transition-colors"
              onClick={toggleLike}
            >
              {liked ? <BsHeartFill className="mr-2 text-red-500" /> : <BsHeart className="mr-2" />}
              {liked ? "Liked" : "Like"}
            </button>
            <span className="flex items-center text-gray-900">
              <AiOutlineComment className="mr-2" />
              {comments.length} Comments
            </span>
          </div>
  
          <hr />
  
          <div
            className="text-lg text-gray-800 mb-6 mt-6"
            dangerouslySetInnerHTML={{ __html: post.desc }}
          />
        </div>

        {/* Right Side: Author Information - Responsive */}
        <div className="bg-white text-black shadow-lg rounded-lg w-full mt-6 md:mt-0 md:w-2/5 h-3/4 p-6 border border-gray-300">
          {author && (
            <>
              <h3 className="text-2xl font-semibold mb-2 ">Know About the Author</h3>
              <div className="block mb-2 justify-center ">
                <FaUserAlt className="ml-32 text-3xl" />
                <span className="font-semibold -ml-5">{author.username}</span>
                
              </div>
              <p className="mb-4 font-semibold">Email: {author.email}</p>
              <p className="mb-4 font-semibold">Bio: {author.bio}</p>
  
              {/* Social Media Links */}
              <div className="flex space-x-3 mt-4 justify-center">
                <h4 className="font-semibold">Social Links:</h4>

                {Object.entries(author?.socialLinks || {}).map(([key, value]) => {
                  if (value) {
                    switch (key) {
                      case 'facebook':
                        return (
                          <a key={key} href={value} target="_blank" rel="noreferrer">
                            <FaFacebook className="text-blue-600 text-xl" />
                          </a>
                        );
                      case 'twitter':
                        return (
                          <a key={key} href={value} target="_blank" rel="noreferrer">
                            <FaTwitter className="text-blue-400 text-xl" />
                          </a>
                        );
                      case 'linkedin':
                        return (
                          <a key={key} href={value} target="_blank" rel="noreferrer">
                            <FaLinkedin className="text-blue-700 text-xl" />
                          </a>
                        );
                      case 'github':
                        return (
                          <a key={key} href={value} target="_blank" rel="noreferrer">
                            <FaGithub className="text-black text-xl" />
                          </a>
                        );
                      case 'instagram':
                        return (
                          <a key={key} href={value} target="_blank" rel="noreferrer">
                            <FaInstagram className="text-pink-500 text-xl" />
                          </a>
                        );
                      default:
                        return null;
                    }
                  }
                  return null; // If value is empty, return null and don't render anything
                })}
              </div>
              <div className="bg-white shadow-md rounded-lg p-6 mt-10">
                          <h3 className="text-xl text-black font-bold mb-4">Share this Post</h3>
                          <button
                            className="flex items-center text-gray-800 font-medium hover:text-blue-600 transition-colors"
                            onClick={handleShare}
                          >
                            <AiOutlineShareAlt className="mr-2" />
                            Copy Link
                          </button>
                        </div>
            </>
          )}
        </div>
      </div>
  
      {/* Comments Section */}
       {/* Comments Section */}
<div className="comments">
  <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-slate-800 bg-clip-text text-transparent ">Comments</h2>
  {/* Add Comment */}
<form
  onSubmit={handleCommentSubmit}
  className="flex items-center bg-gray-50 border border-gray-900 rounded-full shadow-md w-full max-w-3xl mx-auto p-2 space-x-4"
>
  {/* Textarea for comment */}
  <textarea
    value={newComment}
    onChange={(e) => setNewComment(e.target.value)}
    placeholder="Write a comment..."
    className="w-full p-3 bg-gray-200 text-gray-800 rounded-full outline-none resize-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
    rows="1" // Adjust height as needed, keeping it thin and short
  />

  {/* Post Button */}
  <button
    type="submit"
    className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
  >
    Post
  </button>
</form>
  {/* Comments List */}
  {comments.length > 0 ? (
    comments.map((comment) => (
      <div key={comment._id} className="flex  space-x-2 items-start mt-3  bg-gray-50 rounded-md border border-black">
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
