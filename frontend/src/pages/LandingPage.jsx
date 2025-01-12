import React from "react";
import { useNavigate } from "react-router-dom";
import img from '../assets/bg.png';
import { MasonryGridGallery } from "../components/gallery";
import Footer from "../components/footer";
const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="h-full w-full">
      {/* Navbar */}
      <nav className="w-full fixed top-0 left-0 bg-transparent backdrop-blur-md px-6 py-4 flex justify-between items-center z-50-mt-5">
        <div className="flex items-center gap-2">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPUlfIHu-SuqWJzvIiA_5TXhHbCXemIR3r0w&s"
            alt="Inkspire Logo"
            className="h-16 w-24"
          />
          
        </div>
        <div className="flex items-center gap-6">
          <a href="#features" className="text-white hover:text-gray-300">
            Features
          </a>
          <a href="#gallery" className="text-white hover:text-gray-300">
            Gallery
          </a>
          <a href="#testimonials" className="text-white hover:text-gray-300">
            Testimonials
          </a>
          <a href="#contact" className="text-white hover:text-gray-300">
            Contact
          </a>
          <button
            onClick={handleLogin}
            className="bg-white text-purple-600 font-semibold py-1 px-4 rounded-lg shadow-md hover:bg-gray-100"
          >
            Login
          </button>
          <button
            onClick={handleRegister}
            className="bg-purple-600 text-white font-semibold py-1 px-4 rounded-lg shadow-md hover:bg-purple-700"
          >
            Register
          </button>
        </div>
      </nav>
    <div className=" -mt-24 bg-center" style={{ backgroundImage: `url(${img})` }}>
      {/* Hero Section */}
      <div
  id="hero"
  className="h-screen flex flex-col justify-center items-center "
>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-indigo-600 bg-clip-text text-transparent mb-4 ">Welcome to Inkspire</h1>
        <p className="text-lg text-white mb-8 text-center max-w-2xl">
          Discover amazing features, explore a world of creativity, and connect with others like never before.
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

      {/* Features Section */}
      <div id="features" className="py-20 px-10  text-gray-800" >
        <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-red-600 to-indigo-600 bg-clip-text text-transparent">Features</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-3">Seamless Collaboration
            </h3>
            <p>Empower your team to collaborate effortlessly with real-time sharing and synchronized editing. Whether you're working on documents, designs, or presentations, work together from anywhere, anytime.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-3">Advanced Analytics</h3>
            <p>Gain valuable insights into your team's performance and progress with our advanced analytics tools. Visualize data through interactive charts and reports to make informed decisions quickly.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-3">Secure Cloud Storage</h3>
            <p>Safeguard your important files with our secure, cloud-based storage system. Access your files anytime from any device while ensuring they are protected with top-tier encryption protocols.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-3">Customizable User Interface</h3>
            <p>Personalize your workspace with customizable themes, layouts, and widgets. Tailor the interface to suit your preferences and increase productivity with a workspace that feels just right for you.</p>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div id="gallery" className="py-20 px-10" >
        <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-lime-600 to-indigo-600 bg-clip-text text-transparent">Gallery</h2>
        <MasonryGridGallery/>
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="py-20 px-10 text-gray-800">
        <h2 className="text-4xl bg-gradient-to-r from-rose-700 to-indigo-600 bg-clip-text text-transparent font-bold text-center mb-10">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <p className="italic">"This platform has completely changed how I work!"</p>
            <h3 className="mt-4 text-lg font-semibold">- John Doe</h3>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <p className="italic">"Amazing features and seamless experience!"</p>
            <h3 className="mt-4 text-lg font-semibold">- Jane Smith</h3>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <p className="italic">"Innovative ideas and Thoughts Everyday!!"</p>
            <h3 className="mt-4 text-lg font-semibold">- Jason Van Antonio</h3>
          </div>
        </div>
      </div>
      </div>
      {/* Contact Section */}
      <div id="contact" className="py-20 px-5 bg-white h-1/6 text-gray-800">
        <h2 className="text-4xl font-bold text-center mb-10">Contact Us</h2>
        <form className="max-w-lg mx-auto">
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-600">Message</label>
            <textarea
              rows="4"
              className="w-full px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg shadow-md hover:bg-purple-700"
          >
            Submit
          </button>
        </form>
      </div>
<Footer/>
    </div>
  );
};

export default LandingPage;
