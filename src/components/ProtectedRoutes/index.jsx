import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.login.loggedInUser);
  let location = useLocation();

  return !user.username ? <Navigate to="/login" state={{ from: location }} replace /> : children;
};

export default ProtectedRoute;
