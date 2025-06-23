import React, { useState } from "react";
import { Grid, Typography, TextField, Button, Card } from "@material-ui/core";
import BackdropFilter from "react-backdrop-filter";
import Logo from "../Images/CanadianSolutionsLogo.png";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { registerUser } from "../actions/UserActions";

const Signup = ({ registerUser, userInfo }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!user.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email validation
    if (!user.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = "Email is invalid";
    }

    // Password validation
    if (!user.password) {
      newErrors.password = "Password is required";
    } else if (user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Confirm password validation
    if (!user.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (user.password !== user.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const signupClick = () => {
    if (validateForm()) {
      registerUser(user);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      signupClick();
    }
  };

  return (
    <div className="container">
      <div
        className="inside-container"
        style={{
          backgroundColor: "rgba(0,0,0, 0.08)",
        }}
      >
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          spacing={4}
          style={{
            paddingTop: "30px",
            paddingBottom: "30px",
            color: "black",
          }}
        >
          <Grid item md={3} style={{ padding: "30px" }}></Grid>
          <Grid item md={6} style={{ padding: "30px" }}>
            <BackdropFilter
              className="blurred"
              filter={"blur(10px)"}
              html2canvasOpts={{
                allowTaint: true,
              }}
              onDraw={() => {
                console.log("Rendered !");
              }}
            >
              <Card
                style={{
                  padding: "30px",
                  backgroundColor: "transparent",
                  color: "black",
                  boxShadow: "none",
                }}
              >
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item md={12} sm={12} style={{ textAlign: "center" }}>
                    <img alt="Canadian Solutions Logo" src={Logo}></img>
                    <Typography
                      variant="h6"
                      paragraph="true"
                      style={{ textTransform: "uppercase" }}
                    >
                      Join <strong>Canadian Solutions</strong>
                    </Typography>
                    <Typography variant="subtitle1" align="justify">
                      Create your account to connect with Canadian businesses,
                      share insights through our blog platform, and participate
                      in community discussions.
                    </Typography>
                  </Grid>

                  {/* Success Message */}
                  {userInfo.registerSuccess && (
                    <Grid item md={12} sm={12} xs={12}>
                      <Typography
                        variant="body2"
                        style={{
                          fontWeight: "bold",
                          color: "green",
                          textAlign: "center",
                        }}
                      >
                        {userInfo.registerSuccess}
                      </Typography>
                    </Grid>
                  )}

                  {/* Name Field */}
                  <Grid
                    item
                    md={12}
                    sm={12}
                    xs={12}
                    style={{ textAlign: "left" }}
                  >
                    <Typography
                      variant="subtitle1"
                      style={{ fontWeight: "900" }}
                    >
                      Full Name
                    </Typography>
                    <TextField
                      variant="filled"
                      fullWidth
                      margin="dense"
                      placeholder="Enter your full name"
                      autoFocus={true}
                      value={user.name}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                      error={!!errors.name}
                      helperText={errors.name}
                    />
                  </Grid>

                  {/* Email Field */}
                  <Grid
                    item
                    md={12}
                    sm={12}
                    xs={12}
                    style={{ textAlign: "left" }}
                  >
                    <Typography
                      variant="subtitle1"
                      style={{ fontWeight: "900" }}
                    >
                      Email
                    </Typography>
                    <TextField
                      variant="filled"
                      fullWidth
                      margin="dense"
                      placeholder="Enter your email address"
                      type="email"
                      value={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                      error={!!errors.email}
                      helperText={errors.email}
                    />
                  </Grid>

                  {/* Password Field */}
                  <Grid
                    item
                    md={12}
                    sm={12}
                    xs={12}
                    style={{ textAlign: "left" }}
                  >
                    <Typography
                      variant="subtitle1"
                      style={{ fontWeight: "900" }}
                    >
                      Password
                    </Typography>
                    <TextField
                      variant="filled"
                      fullWidth
                      margin="dense"
                      placeholder="Create a password (min 6 characters)"
                      type="password"
                      value={user.password}
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                      error={!!errors.password}
                      helperText={errors.password}
                    />
                  </Grid>

                  {/* Confirm Password Field */}
                  <Grid
                    item
                    md={12}
                    sm={12}
                    xs={12}
                    style={{ textAlign: "left" }}
                  >
                    <Typography
                      variant="subtitle1"
                      style={{ fontWeight: "900" }}
                    >
                      Confirm Password
                    </Typography>
                    <TextField
                      variant="filled"
                      fullWidth
                      margin="dense"
                      placeholder="Confirm your password"
                      type="password"
                      value={user.confirmPassword}
                      onChange={(e) =>
                        setUser({ ...user, confirmPassword: e.target.value })
                      }
                      onKeyPress={handleKeyDown}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword}
                    />
                  </Grid>

                  {/* Error Message */}
                  {userInfo.registerError && (
                    <Grid item md={12} sm={12} xs={12}>
                      <Typography
                        variant="body2"
                        style={{ fontWeight: "bold", color: "red" }}
                      >
                        {userInfo.registerError}
                      </Typography>
                    </Grid>
                  )}

                  <Grid item md={6} xs={12}></Grid>

                  {/* Sign Up Button */}
                  <Grid item md={6} sm={6} xs={12}>
                    <Button
                      variant="text"
                      onClick={signupClick}
                      style={{
                        backgroundColor: "rgba(0,0,0, 0.05)",
                        width: "100%",
                        color: "black",
                      }}
                    >
                      Sign Up
                    </Button>
                  </Grid>

                  {/* Login Link */}
                  <Grid item md={12} sm={12} style={{ textAlign: "center" }}>
                    <Typography variant="body2" style={{ fontWeight: "bold" }}>
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        style={{
                          color: "black",
                          textDecoration: "underline",
                          fontWeight: "900",
                        }}
                      >
                        Login here
                      </Link>
                    </Typography>
                  </Grid>

                  <Grid item md={12} sm={12} style={{ textAlign: "left" }}>
                    <Typography variant="body2" style={{ fontWeight: "bold" }}>
                      Please contact our support if you encounter any issues or
                      need help.
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </BackdropFilter>
          </Grid>
          <Grid item md={3}></Grid>
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.user,
});

export default connect(mapStateToProps, {
  registerUser,
})(Signup);
