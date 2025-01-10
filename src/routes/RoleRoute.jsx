import React from "react";
import { Navigate} from "react-router-dom";
import { getUserRole } from "../utils/currentUser";
import { PATH } from "../utils/path";

function RoleRoute({ children, roles }) {
  const user = getUserRole();
  return !roles.length || roles.includes(user)
    ? children
    : <Navigate to={PATH.UNAUTHORIZED} replace />;
}

export default RoleRoute;
