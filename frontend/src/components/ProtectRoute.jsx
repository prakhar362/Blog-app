import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext"; // Import UserContext

const ProtectRoute = ({ children }) => {
  const { user } = useContext(UserContext); // Get user data from context

  // Redirect to login if the user is not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectRoute;
