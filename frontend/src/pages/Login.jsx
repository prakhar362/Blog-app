import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";  // Import UserContext
import { URL } from "../url"; // Make sure the path is correct
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);  // Access setUser function from context

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch(`${URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData.message || "Login failed");
        setError(true);
        return;
      }

      const data = await response.json();
      console.log("Login successful:", data);

// Save user credentials to local storage
localStorage.setItem("userCredentials", JSON.stringify(data));
// Store the token in local storage
localStorage.setItem("token", data.token);

// Show success toast notification
toast.success('Login Successful! ✅', {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
});
// Set the user data in the context after successful login
setUser(data);
setTimeout(2000)
// Redirect to the home page
// Redirect to the home page after a 3-second delay
      setTimeout(() => {
        navigate("/home"); // Use navigate to redirect to home
      }, 2000); // 3-second delay for toast to finish

    } catch (err) {
      console.error("Unexpected error during login:", err);
      setError(true);
    }
  };
  const isFormValid = formData.email && formData.password;

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-2xl shadow-md">
          <h1 className="text-3xl font-semibold text-center text-black">Sign In</h1>
          <p className="text-center text-gray-900">
            Enter your email and password to access your account
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
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
                className={`mt-1 block w-full h-12 px-4 z-10 rounded-md border-2 border-gray-900 bg-white text-black shadow-sm focus:border-black focus:ring-black ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="mt-2 text-md text-red-600">{errors.email}</p>
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
                className={`mt-1 block w-full h-12 px-4 rounded-md border-2 border-gray-300 bg-white text-black shadow-sm focus:border-black focus:ring-black ${
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
              Sign In
            </button>
            <ToastContainer />
            {error && (
              <p className="text-red-500 text-center">
                Invalid credentials, please try again.
              </p>
            )}
          </form>
          <div className="text-center">
            <p>
              Don't have an account yet?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-black underline"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
