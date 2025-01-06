import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-blue-500 text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to My Blog</h1>
      <p className="text-lg mb-8 text-center max-w-lg">
        Discover amazing content, share your thoughts, and connect with others!
      </p>
      <div className="flex space-x-4">
        <button
          onClick={handleLogin}
          className="bg-white text-purple-600 font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-gray-100"
        >
          Login
        </button>
        <button
          onClick={handleRegister}
          className="bg-purple-600 font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-purple-700"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
