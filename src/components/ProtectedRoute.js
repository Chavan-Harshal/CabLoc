import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, allowedRoles, ...rest }) => {
  console.log("herer");
  const role = localStorage.getItem("role");
  if (!allowedRoles.includes(role)) {
    // localStorage.clear();
    return <Redirect to="/" />;
  }
  return (
    <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
  );
};

export default ProtectedRoute;
