import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import PostDetails from './pages/Postdetails';
import EditPost from './pages/EditPost';
import MyBlogs from './pages/Myblogs';
import Profile from './pages/Profile';
import Landing from './pages/LandingPage';
import ProtectRoute from "./components/ProtectRoute"; // Import the ProtectRoute component
import { UserContextProvider } from './context/UserContext';  // Import UserContextProvider

function App() {
  return (
    <>
    <UserContextProvider>  {/* Wrap with UserContextProvider */}
      <Routes>
        <Route exact path="/" element={<Landing />} />
        
        {/* Protected Route */}
        <Route
          path="/home"
          element={
            <ProtectRoute>
              <Home />
            </ProtectRoute>
          }
        />
        
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/write" element={<CreatePost />} />
        <Route exact path="/Post/post/:id" element={<PostDetails />} />
        <Route exact path="/edit/:id" element={<EditPost />} />
        <Route exact path="/myblogs/:id" element={<MyBlogs />} />
        <Route exact path="/profile/:id" element={<Profile />} />
      </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
