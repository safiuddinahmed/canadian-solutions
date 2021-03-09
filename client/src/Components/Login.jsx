import React, { useState } from "react";
import { Grid, Typography, TextField, Button, Card } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
import BackdropFilter from "react-backdrop-filter";
import Logo from "../Images/CanadianSolutionsLogo.png";
import { connect } from "react-redux";

import { loginUser } from "../actions/UserActions";

const Login = ({ loginUser, userInfo }) => {
  // const classes = useStyles();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const loginClick = () => {
    loginUser(user);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      loginUser(user);
    }
  };

  var error = false;

  if (userInfo.loginError === "Invalid Credentials") {
    error = true;
  }

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
                  // backgroundColor: "rgb(0,0,0)",
                  // backgroundColor: "rgba(0,0,0, 0.06)",
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
                      Welcome to <strong>Canadian Solutions</strong>
                    </Typography>
                    <Typography variant="subtitle1" align="justify">
                      Canadian Solutions is an IT company based in Toronto,
                      Canada, which specializes in providing small businesses
                      exposure virtually. We aim to provide an interconnected
                      array of services and products on an online platform that
                      will bring local businesses together in Canada. The scope
                      of the company is to help registered organizations
                      advertise their services to each other or their clients
                      effortlessly.
                    </Typography>
                  </Grid>
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
                      placeholder="Email"
                      autoFocus={true}
                      defaultValue={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                      error={error}
                    />
                  </Grid>

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
                      placeholder="Password"
                      type="password"
                      value={user.password}
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                      onKeyPress={handleKeyDown}
                      error={error}
                    />
                    <Typography
                      variant="body2"
                      style={{ fontWeight: "bold", color: "red" }}
                    >
                      {userInfo.loginError}
                    </Typography>
                  </Grid>

                  <Grid item md={6} xs={12}></Grid>

                  <Grid item md={6} sm={6} xs={12}>
                    <Button
                      variant="text"
                      onClick={loginClick}
                      style={{
                        backgroundColor: "rgba(0,0,0, 0.05)",
                        width: "100%",
                        color: "black",
                      }}
                    >
                      Login
                    </Button>
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
  loginUser,
})(Login);
