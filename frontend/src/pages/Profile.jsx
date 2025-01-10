import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../url"; // Backend base URL
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const ProfilePage = () => {
  const { id } = useParams(); // Get the dynamic 'id' param from the URL
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    username: "",
    email: "",
    bio: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${URL}/api/users/${id}`); // Use the `id` from useParams
        setUser(response.data);
        setUpdatedUser(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, [id]); // Use `id` as the dependency

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setUpdatedUser(user); // Reset to original values
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`${URL}/api/users/${id}`, updatedUser); // Use the `id` from useParams
      setUser(response.data);
      setIsEditing(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen">
      <Navbar className='bg-black' />
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-2xl mt-10">
        <h2 className="text-3xl font-semibold text-center text-gray-950 mb-6">Profile Page</h2>
        <div className="space-y-6">
          {/* Username */}
          <div className="flex items-center space-x-4">
            <strong className="w-20 text-gray-800">Name:</strong>
            {!isEditing ? (
              <span className="text-lg text-gray-900">{user.username}</span>
            ) : (
              <input
                type="text"
                name="username"
                value={updatedUser.username}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            )}
          </div>

          {/* Email */}
          <div className="flex items-center space-x-4">
            <strong className="w-20 text-gray-800">Email:</strong>
            {!isEditing ? (
              <span className="text-lg text-gray-900">{user.email}</span>
            ) : (
              <input
                type="email"
                name="email"
                value={updatedUser.email}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            )}
          </div>

          {/* Bio */}
          <div className="flex items-start space-x-4">
            <strong className="w-20 text-gray-800">About:</strong>
            {!isEditing ? (
              <span className="text-lg text-gray-900">{user.bio}</span>
            ) : (
              <textarea
                name="bio"
                value={updatedUser.bio}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md w-full h-32 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-center space-x-4 mt-6">
            {!isEditing ? (
              <button
                onClick={handleEditClick}
                className="px-6 py-3 bg-gray-800 text-white rounded-md text-lg hover:bg-black transition ease-in-out duration-200"
              >
                Edit
              </button>
            ) : (
              <div className="flex space-x-4">
                <button
                  onClick={handleCancelClick}
                  className="px-6 py-3 bg-gray-500 text-white rounded-md text-lg hover:bg-gray-600 transition ease-in-out duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-green-500 text-white rounded-md text-lg hover:bg-green-600 transition ease-in-out duration-200"
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <br /> <br /> <br />
      <Footer />
    </div>
  );
};

export default ProfilePage;
