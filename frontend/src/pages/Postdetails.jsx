import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { AiOutlineComment } from "react-icons/ai";
import { URL } from "../url"; // Backend base URL

const PostDetails = () => {
  const { id } = useParams(); // Post ID from the route
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(false);

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
      try {
        const response = await fetch(`${URL}/api/comments/post/${id}`);
        const data = await response.json();
        setComments(data);
      } catch (err) {
        console.error("Failed to fetch comments", err);
      }
    };

    fetchComments();
  }, [id]);

  // Handle new comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}/api/comments/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: newComment,
          author:user.username,postId:postId,userId:user._id
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

  if (!post) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      {/* Post Details */}
      <div className="post-details mb-8">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-96 object-cover rounded-md mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <div className="text-gray-500 mb-4">
          By <span className="font-semibold">{post.author}</span> | Categories:{" "}
          {post.categories.join(", ")}
        </div>
        <p className="text-lg mb-6">{post.content}</p>

        {/* Like and Comment Buttons */}
        <div className="flex items-center space-x-6">
          <button
            className="flex items-center text-gray-600 hover:text-red-500"
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
      </div>

      {/* Comments Section */}
      <div className="comments">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>

        {/* Comments List */}
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="mb-4">
              <p className="bg-gray-100 p-4 rounded-md">{comment.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        )}

        {/* Add Comment */}
        <form onSubmit={handleCommentSubmit} className="mt-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-4 bg-gray-100 rounded-md outline-none"
            rows="4"
          />
          <button
            type="submit"
            className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostDetails;
