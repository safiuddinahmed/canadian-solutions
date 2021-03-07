import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  var token = window.localStorage.getItem("token");

  const isLoggedIn = () => {
    if (token === null) {
      localStorage.setItem("pathName", window.location.pathname);
      return false;
    } else {
      return true;
    }
  };
  const redirect = () => {
    window.location.assign("/login");
  };
  return (
    <Route
      {...rest}
      render={(props) => (isLoggedIn() ? <Component {...props} /> : redirect())}
    />
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(PrivateRoute);
