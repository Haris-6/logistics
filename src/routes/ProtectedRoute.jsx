import React from "react";
import { Navigate } from "react-router-dom";
import { PATH } from "../utils/path";
import { getCurrentUser } from "../utils/currentUser";

function ProtectedRoute({ children }) {
  const isLoggedIn = getCurrentUser();

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />;
  }
  return children;
}

export default ProtectedRoute;
