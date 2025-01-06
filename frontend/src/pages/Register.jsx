import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Registering with:", formData);
      // Perform registration logic here
    }
  };

  const isFormValid = formData.username && formData.email && formData.password;

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link to="/" className="flex items-center justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/8521/8521795.png"
            alt="Logo"
            className="max-h-10 min-w-10"
          />
          <span className="font-extrabold text-2xl ml-4 text-black">Blogosphere</span>
        </Link>
      </header>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-xl shadow-md">
          <h1 className="text-3xl font-semibold text-center text-black">Sign Up</h1>
          <p className="text-center text-gray-600">
            Enter your details to create a new account
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-md font-medium text-gray-900">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={`mt-1 block w-full h-12 px-4 rounded-md border-2 border-gray-200 bg-white text-black shadow-sm focus:border-black focus:ring-black ${
                  errors.username ? "border-red-500" : ""
                }`}
              />
              {errors.username && (
                <p className="mt-2 text-sm text-red-600">{errors.username}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-md font-medium text-gray-900">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`mt-1 block w-full h-12 px-4 rounded-md border-2 border-gray-200 bg-white text-black shadow-sm focus:border-black focus:ring-black ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-md font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`mt-1 block w-full h-12 px-4 rounded-md border-2 border-gray-200 bg-white text-black shadow-sm focus:border-black focus:ring-black ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-3 rounded-md text-white font-semibold ${
                isFormValid ? "bg-black hover:bg-gray-800" : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Sign Up
            </button>
          </form>
          <div className="text-center">
            <p>
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-black underline"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
