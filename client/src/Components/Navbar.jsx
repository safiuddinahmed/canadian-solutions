import React, { useState } from "react";
import { connect } from "react-redux";
import {
  makeStyles,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
} from "@material-ui/core";

import MoreIcon from "@material-ui/icons/MoreVert";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useHistory,
  Switch,
} from "react-router-dom";

import Logo from "../Images/CanadianSolutionsLogo.png";

import Footer from "./Footer";
import HomePage from "./HomePage";
import BusinessesPage from "./Businesses";
import ProfilePage from "./Profile";
import BlogsPage from "./Blogs";
import ForumsPage from "./Forums";
import LoginPage from "./Login";
import FAQsPage from "./Faq";
import PrivateRoute from "./PrivateRoute";

import { updateAppbar } from "../actions/AppbarActions";

const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      subtitle1: {
        fontFamily: "Scope One, sans-serif",
      },
      subtitle2: {
        fontFamily: "Scope One, sans-serif",
      },
      body1: {
        fontFamily: "Scope One, sans-serif",
      },
      body2: {
        fontFamily: "Scope One, sans-serif",
      },
      h1: {
        fontFamily: "Scope One, sans-serif",
      },
      h2: {
        fontFamily: "Scope One, sans-serif",
      },
      h3: {
        fontFamily: "Indie Flower, cursive",
      },
      h4: {
        fontFamily: "Scope One, sans-serif",
      },
      h5: {
        fontFamily: "Source Code Pro, sans-serif",
      },
      h6: {
        fontFamily: "Scope One, sans-serif",
      },
    },
    MuiTab: {
      root: {
        textTransform: "none",
        fontWeight: "900",
        color: "white",
      },
    },
    MuiFilledInput: {
      root: {
        // color: "white",
        backgroundColor: "rgb(0, 0, 0, 0.05)",
      },
    },
    MuiBottomNavigationAction: {
      root: {
        MuiSelected: {
          color: "green",
        },
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  content: {
    backgroundColor: "#FDFFFF",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  selected: {
    background:
      "linear-gradient(90deg, rgb(27, 34, 58) 0%, rgb(27, 34, 58) 100%)",
    borderBottom: "4px solid #fff",
  },
  mobileSelected: {
    fontWeight: "bold",
  },
}));
const Navbar = ({ appbar: { menuSelected }, updateAppbar }) => {
  const history = useHistory();

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  var nameLocal = window.localStorage.getItem("name");
  var token = window.localStorage.getItem("token");

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("userID");
    localStorage.removeItem("email");
    localStorage.removeItem("currentBusiness");
    localStorage.removeItem("empty");
    localStorage.removeItem("pathName");
    window.location.assign("/");
  };

  const loginUser = () => {
    window.location.assign("/login");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {nameLocal !== null && (
        <MenuItem style={{ cursor: "auto" }} color="inherit">
          Welcome, {nameLocal}
        </MenuItem>
      )}
      <MenuItem
        selected={menuSelected === 1}
        onClick={() => updateAppbar(1)}
        classes={{ selected: classes.mobileSelected }}
        component={Link}
        to="/businesses"
      >
        <p>Businesses</p>
      </MenuItem>
      <MenuItem
        selected={menuSelected === 2}
        onClick={() => updateAppbar(2)}
        classes={{ selected: classes.mobileSelected }}
        component={Link}
        to="/blogs"
      >
        <p>Blogs</p>
      </MenuItem>
      <MenuItem
        selected={menuSelected === 3}
        onClick={() => updateAppbar(3)}
        classes={{ selected: classes.mobileSelected }}
        component={Link}
        to="/forums"
      >
        <p>Forums</p>
      </MenuItem>
      <MenuItem
        selected={menuSelected === 4}
        onClick={() => updateAppbar(4)}
        classes={{ selected: classes.mobileSelected }}
        component={Link}
        to="/profile"
      >
        <p>Profile</p>
      </MenuItem>
      <MenuItem
        selected={menuSelected === 6}
        onClick={() => updateAppbar(6)}
        classes={{ selected: classes.mobileSelected }}
        component={Link}
        to="/faqs"
      >
        <p>FAQs</p>
      </MenuItem>
      {token === null && (
        <MenuItem
          selected={menuSelected === 5}
          onClick={loginUser}
          classes={{ selected: classes.selected }}
        >
          <p>Login</p>
        </MenuItem>
      )}
      {token !== null && (
        <MenuItem
          selected={menuSelected === 5}
          onClick={logoutUser}
          classes={{ selected: classes.selected }}
        >
          Logout
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.grow}>
        <Router history={history}>
          <AppBar className="navbar">
            <Toolbar>
              <Typography variant="h6">
                <Link to="/">
                  <img src={Logo} alt="Canadian Solutions" height="150px"></img>
                </Link>
              </Typography>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                {nameLocal !== null && (
                  <MenuItem style={{ cursor: "auto" }} color="inherit">
                    Welcome, {nameLocal}
                  </MenuItem>
                )}
                <MenuItem
                  selected={menuSelected === 1}
                  onClick={() => updateAppbar(1)}
                  classes={{ selected: classes.selected }}
                  className="nav-links"
                  color="inherit"
                  component={Link}
                  to="/businesses"
                >
                  Businesses
                </MenuItem>
                <MenuItem
                  className="nav-links"
                  color="inherit"
                  selected={menuSelected === 2}
                  onClick={() => updateAppbar(2)}
                  classes={{ selected: classes.selected }}
                  component={Link}
                  to="/blogs"
                >
                  Blogs
                </MenuItem>
                <MenuItem
                  className="nav-links"
                  color="inherit"
                  selected={menuSelected === 3}
                  onClick={() => updateAppbar(3)}
                  classes={{ selected: classes.selected }}
                  component={Link}
                  to="/forums"
                >
                  Forums
                </MenuItem>
                <MenuItem
                  className="nav-links"
                  color="inherit"
                  selected={menuSelected === 4}
                  onClick={() => updateAppbar(4)}
                  classes={{ selected: classes.selected }}
                  component={Link}
                  to="/profile"
                >
                  Profile
                </MenuItem>
                <MenuItem
                  className="nav-links"
                  color="inherit"
                  selected={menuSelected === 6}
                  onClick={() => updateAppbar(6)}
                  classes={{ selected: classes.selected }}
                  component={Link}
                  to="/faqs"
                >
                  FAQs
                </MenuItem>
                {token !== null && (
                  <MenuItem
                    className="nav-links"
                    color="inherit"
                    selected={menuSelected === 5}
                    onClick={logoutUser}
                    classes={{ selected: classes.selected }}
                  >
                    Logout
                  </MenuItem>
                )}
                {token === null && (
                  <MenuItem
                    className="nav-links"
                    color="inherit"
                    selected={menuSelected === 5}
                    onClick={loginUser}
                    classes={{ selected: classes.selected }}
                  >
                    Login
                  </MenuItem>
                )}
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
          <main>
            <Toolbar />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/businesses" component={BusinessesPage} />
              <PrivateRoute path="/profile" component={ProfilePage} />
              <PrivateRoute path="/blogs" component={BlogsPage} />
              <PrivateRoute path="/forums" component={ForumsPage} />
              <Route path="/faqs" component={FAQsPage} />
              <Route path="/login" component={LoginPage} />
            </Switch>
          </main>
        </Router>
        <Footer />
      </div>
    </MuiThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  appbar: state.appbar,
});

export default connect(mapStateToProps, {
  updateAppbar,
})(Navbar);
