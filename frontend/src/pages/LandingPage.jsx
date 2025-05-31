import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import img from '../assets/bg.png';
import { MasonryGridGallery } from "../components/gallery";
import Footer from "../components/footer";
import { 
  FaUsers, 
  FaChartLine, 
  FaCloud, 
  FaPalette,
  FaRocket,
  FaShieldAlt,
  FaLightbulb,
  FaMobileAlt,
  FaStar,
  FaQuoteLeft
} from 'react-icons/fa';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const features = [
    {
      icon: <FaUsers className="w-12 h-12" />,
      title: "Seamless Collaboration",
      description: "Work together in real-time with synchronized editing and sharing capabilities.",
      gradient: "from-purple-500 to-pink-500",
      iconColor: "text-purple-500"
    },
    {
      icon: <FaChartLine className="w-12 h-12" />,
      title: "Advanced Analytics",
      description: "Get insights with interactive charts and detailed performance reports.",
      gradient: "from-blue-500 to-cyan-500",
      iconColor: "text-blue-500"
    },
    {
      icon: <FaCloud className="w-12 h-12" />,
      title: "Secure Cloud Storage",
      description: "Your files are protected with top-tier encryption and secure cloud storage.",
      gradient: "from-green-500 to-emerald-500",
      iconColor: "text-green-500"
    },
    {
      icon: <FaPalette className="w-12 h-12" />,
      title: "Customizable Interface",
      description: "Personalize your workspace with themes and layouts that suit your style.",
      gradient: "from-orange-500 to-red-500",
      iconColor: "text-orange-500"
    },
    {
      icon: <FaRocket className="w-12 h-12" />,
      title: "Fast Performance",
      description: "Experience lightning-fast loading times and smooth interactions.",
      gradient: "from-indigo-500 to-purple-500",
      iconColor: "text-indigo-500"
    },
    {
      icon: <FaShieldAlt className="w-12 h-12" />,
      title: "Enhanced Security",
      description: "Your data is protected with advanced security measures.",
      gradient: "from-teal-500 to-blue-500",
      iconColor: "text-teal-500"
    },
    {
      icon: <FaLightbulb className="w-12 h-12" />,
      title: "Smart Features",
      description: "AI-powered tools to enhance your productivity and creativity.",
      gradient: "from-yellow-500 to-orange-500",
      iconColor: "text-yellow-500"
    },
    {
      icon: <FaMobileAlt className="w-12 h-12" />,
      title: "Mobile Ready",
      description: "Access your work seamlessly across all your devices.",
      gradient: "from-pink-500 to-rose-500",
      iconColor: "text-pink-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Creator",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      rating: 5,
      quote: "Inkspire has transformed how I share my stories. The platform's intuitive design and powerful features make content creation a joy. I've seen my engagement grow significantly since switching!",
      company: "Creative Studios"
    },
    {
      name: "Michael Chen",
      role: "Tech Blogger",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      rating: 5,
      quote: "As a tech blogger, I need a platform that's both powerful and user-friendly. Inkspire delivers on both fronts. The analytics features help me understand my audience better than ever.",
      company: "Tech Insights"
    },
    {
      name: "Emma Rodriguez",
      role: "Digital Artist",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      rating: 5,
      quote: "The visual customization options are incredible! I can showcase my artwork exactly how I want it. The community engagement features have helped me connect with fellow artists worldwide.",
      company: "Art Collective"
    }
  ];

  return (
    <div className="h-full w-full">
      {/* Navbar */}
      <nav className="w-full fixed top-0 left-0 bg-transparent backdrop-blur-md px-4 md:px-6 py-4 flex justify-between items-center z-50">
        <div className="flex items-center gap-2">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPUlfIHu-SuqWJzvIiA_5TXhHbCXemIR3r0w&s"
            alt="Inkspire Logo"
            className="h-12 w-20 md:h-16 md:w-28"
          />
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-white hover:text-gray-300 transition-colors">
            Features
          </a>
          <a href="#gallery" className="text-white hover:text-gray-300 transition-colors">
            Gallery
          </a>
          <a href="#testimonials" className="text-white hover:text-gray-300 transition-colors">
            Testimonials
          </a>
          <a href="#contact" className="text-white hover:text-gray-300 transition-colors">
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

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md md:hidden">
            <div className="flex flex-col p-4 space-y-4">
              <a href="#features" className="text-white hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Features
              </a>
              <a href="#gallery" className="text-white hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Gallery
              </a>
              <a href="#testimonials" className="text-white hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Testimonials
              </a>
              <a href="#contact" className="text-white hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Contact
              </a>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={handleLogin}
                  className="w-full bg-white text-purple-600 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-100"
                >
                  Login
                </button>
                <button
                  onClick={handleRegister}
                  className="w-full bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <div className="-mt-24 bg-center bg-cover bg-fixed" style={{ backgroundImage: `url(${img})` }}>
        {/* Hero Section */}
        <div className="absolute inset-0 bg-black/50"></div>
        <div
          id="hero"
          className="relative h-screen flex flex-col justify-center items-center px-4 md:px-6"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-red-600 to-indigo-600 bg-clip-text text-transparent mb-6 md:mb-10 text-center">
            Welcome to Inkspire
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-white mb-8 md:mb-12 text-center max-w-2xl">
            Discover amazing features, explore a world of creativity, and connect with others like never before.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleLogin}
              className="w-full sm:w-auto bg-white text-purple-600 font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-gray-100"
            >
              Login
            </button>
            <button
              onClick={handleRegister}
              className="w-full sm:w-auto bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-purple-700"
            >
              Register
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="relative py-20 px-4 md:px-10 bg-white/95">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Icon Container */}
                <div className={`p-6 ${feature.iconColor} bg-gray-50 group-hover:bg-white transition-colors duration-300`}>
                  {feature.icon}
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>

                {/* Hover Effect Border */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Section */}
        <div id="gallery" className="py-16 md:py-20 px-4 md:px-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-10 bg-gradient-to-r from-lime-600 to-indigo-600 bg-clip-text text-transparent">
            Gallery
          </h2>
          <div className="max-w-7xl mx-auto">
            <MasonryGridGallery/>
          </div>
        </div>

        {/* Testimonials Section */}
        <div id="testimonials" className="py-20 px-4 md:px-10 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              What Our Users Say
            </h2>
            <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
              Join thousands of satisfied creators who have transformed their content sharing experience with Inkspire
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 text-purple-100 group-hover:text-purple-200 transition-colors duration-300">
                    <FaQuoteLeft className="w-8 h-8" />
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    {/* Rating */}
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="w-5 h-5 text-yellow-400" />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {testimonial.quote}
                    </p>

                    {/* Profile */}
                    <div className="flex items-center">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-purple-100"
                      />
                      <div className="ml-4">
                        <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                        <p className="text-xs text-purple-600">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              ))}
            </div>

            {/* Stats Section */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <h3 className="text-3xl font-bold text-purple-600 mb-2">10K+</h3>
                <p className="text-gray-600">Active Users</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-purple-600 mb-2">50K+</h3>
                <p className="text-gray-600">Posts Created</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-purple-600 mb-2">95%</h3>
                <p className="text-gray-600">Satisfaction Rate</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-purple-600 mb-2">24/7</h3>
                <p className="text-gray-600">Support Available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="py-16 md:py-20 px-4 md:px-5 bg-white text-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-10">Contact Us</h2>
          <form className="max-w-lg mx-auto">
            <div className="mb-4 md:mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-600">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your name"
              />
            </div>
            <div className="mb-4 md:mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="your@email.com"
              />
            </div>
            <div className="mb-4 md:mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-600">Message</label>
              <textarea
                rows="4"
                className="w-full px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-lg shadow-md hover:bg-purple-700 transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default LandingPage;
