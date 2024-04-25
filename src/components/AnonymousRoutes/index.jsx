import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AnonymousRoute = ({children}) => {
  const user = useSelector((state) => state.login.loggedInUser);

  return user.username ? <Navigate to='/' replace /> : children;
};

export default AnonymousRoute;
