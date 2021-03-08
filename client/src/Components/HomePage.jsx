import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import { updateAppbar } from "../actions/AppbarActions";
import { getLatestBlogs } from "../actions/BlogsActions";

import Particles from "react-particles-js";
import {
  Button,
  Typography,
  Grid,
  ButtonBase,
  Avatar,
} from "@material-ui/core";
import Footer from "./Footer";

import Popularity from "../Images/popularity.svg";
import Group from "../Images/group.svg";
import Research from "../Images/research.svg";
import CNTower from "../Images/cntower2.png";
import Toronto from "../Images/toronto.jpg";
import Montreal from "../Images/montreal.jpg";
import Vancouver from "../Images/vancouver.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 300,
    width: "100%",
  },
  image: {
    position: "relative",
    height: 200,
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 100,
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15,
      },
      "& $imageMarked": {
        opacity: 0,
      },
      "& $imageTitle": {
        border: "4px solid currentColor",
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
    fontWeight: "900",
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
  avatar: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  largeAvatar: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
}));

const HomePage = ({ updateAppbar, getLatestBlogs, blogs: { latestBlogs } }) => {
  useEffect(() => {
    updateAppbar(0);
    getLatestBlogs();
    // eslint-disable-next-line
  }, []);

  const classes = useStyles();

  return (
    <div>
      <Particles
        style={{ position: "absolute" }}
        height="100%"
        width="100%"
        params={{
          particles: {
            color: {
              value: "#f3e7fd",
            },
            line_linked: {
              color: {
                // value: "rgb(108, 237, 232)",
                value: "#8EC5FC",
              },
            },
            number: {
              value: 40,
            },
            size: {
              value: 15,
            },
            // url: `${Background}`
          },
        }}
      />
      <div className="welcome-content">
        <div style={{ width: "80%", paddingTop: "6rem", zIndex: "10" }}>
          <Typography
            variant="h3"
            align="center"
            paragraph="true"
            style={{
              fontWeight: "900",
              textShadow: "1px 1px",
            }}
          >
            Find the finest Canadian businesses and services catered for you
          </Typography>
          <Typography
            variant="h5"
            align="center"
            paragraph="true"
            style={{ color: "#FFFFFF", fontWeight: "900" }}
          >
            Providing an interconnected array of solutions
          </Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              className="main-button"
              href="/businesses"
              aria-label="Explore Businesses"
            >
              <p className="button-text">Explore</p>
            </Button>
          </div>
        </div>
      </div>
      <div>
        <div style={{ display: "grid", position: "relative" }}>
          <div style={{ position: "relative", transform: "translateY(57.5%)" }}>
            <img
              style={{
                position: "absolute",
                left: "50%",
                transform: "translate(-50%, 50%)",
                bottom: "100%",
                zIndex: "-1",
              }}
              alt="CN Tower"
              src={CNTower}
            />
          </div>
        </div>
      </div>
      <Grid container direction="row" justify="center" className="overview">
        <Grid item md={3} />
        <Grid item md={6}>
          <div>
            <Typography
              variant="h3"
              align="center"
              paragraphy="true"
              style={{ fontWeight: "bold" }}
            >
              The future starts now
            </Typography>
            <br />
            <Typography variant="subtitle1" align="justify" paragraphy="true">
              Canadian Solutions is an IT company based in Toronto, Canada,
              which specializes in providing small businesses exposure
              virtually. We aim to provide an interconnected array of services
              and products on an online platform that will bring local
              businesses together in Canada. The scope of the company is to help
              registered organizations advertise their services to each other or
              their clients effortlessly.
            </Typography>
          </div>
        </Grid>
        <Grid item md={3} />
      </Grid>

      <Grid container direction="row" justify="center" className="what-we-do">
        <Grid item md={3} />
        <Grid item md={6}>
          <div>
            <Typography
              variant="h3"
              align="center"
              paragraphy="true"
              style={{ fontWeight: "bold" }}
            >
              What we do
            </Typography>
            <br />
            <Typography variant="subtitle1" align="center" paragraphy="true">
              We provide a platform for you where your business matters
            </Typography>
          </div>
        </Grid>
        <Grid item md={3} />
        <Grid
          container
          direction="row"
          justify="center"
          md={10}
          spacing={2}
          style={{ paddingTop: "60px" }}
        >
          <Grid item md={4} align="center">
            <div>
              <img height="25%" width="25%" src={Popularity} alt="Exposure" />
              <Typography variant="h5" align="center" paragraph="true">
                Exposure
              </Typography>
              <Typography variant="subtitle1" align="center" paragraph="true">
                Increasing your clientele by giving you an outlet and helping
                you find the right services that could boost your business.
              </Typography>
            </div>
          </Grid>
          <Grid item md={4} align="center">
            <div>
              <img height="25%" width="25%" src={Group} alt="Interactions" />
              <Typography variant="h5" align="center" paragraph="true">
                Interactions
              </Typography>
              <Typography variant="subtitle1" align="center" paragraph="true">
                Providing you with a platform that makes it easier for you to
                interact with other businesses where you can learn and share.
              </Typography>
            </div>
          </Grid>
          <Grid item md={4} align="center">
            <div>
              <img height="25%" width="25%" src={Research} alt="Research" />
              <Typography variant="h5" align="center" paragraph="true">
                Research
              </Typography>
              <Typography variant="subtitle1" align="center" paragraph="true">
                Preparing a collection of research that will help you survive
                and grow in this economy. Useful tips and documents will be
                posted in the Blogs section.
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          align="center"
          md={9}
          sm={10}
          style={{ paddingTop: "60px" }}
        >
          <Typography
            variant="h3"
            align="center"
            paragraphy="true"
            style={{ fontWeight: "900" }}
          >
            Our Locations
          </Typography>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          align="center"
          md={8}
          sm={12}
          style={{ paddingTop: "30px" }}
        >
          <Grid item md={4} sm={4}>
            <Avatar
              alt="Montreal"
              className={classes.largeAvatar}
              src={Montreal}
            />
            <Typography
              variant="subtitle1"
              align="center"
              paragraph="true"
              style={{ paddingTop: "10px" }}
            >
              Montreal
            </Typography>
          </Grid>
          <Grid item md={4} sm={4}>
            <Avatar
              alt="Toronto"
              className={classes.largeAvatar}
              src={Toronto}
            />
            <Typography
              variant="subtitle1"
              align="center"
              paragraph="true"
              style={{ paddingTop: "10px" }}
            >
              Toronto (main office)
            </Typography>
          </Grid>
          <Grid item md={4} sm={4}>
            <Avatar
              alt="Vancouver"
              className={classes.largeAvatar}
              src={Vancouver}
            />
            <Typography
              variant="subtitle1"
              align="center"
              paragraph="true"
              style={{ paddingTop: "10px" }}
            >
              Vancouver
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid container direction="row" justify="center" className="blog-posts">
        <Grid item md={3} />
        <Grid item md={6}>
          <div>
            <Typography
              variant="h3"
              align="center"
              paragraphy="true"
              style={{ fontWeight: "bold" }}
            >
              Recent Blog Posts
            </Typography>
          </div>
        </Grid>
        <Grid item md={3} />
        <Grid
          container
          direction="row"
          justify="center"
          md={10}
          spacing={2}
          style={{ paddingTop: "60px" }}
        >
          {latestBlogs.map((item) => (
            <Grid item md={4} align="center">
              <div className={classes.root}>
                <ButtonBase
                  focusRipple
                  className={classes.image}
                  focusVisibleClassName={classes.focusVisible}
                  style={{
                    width: "100%",
                  }}
                  href={item.url}
                  target="_blank"
                  aria-label="Latest Blog Posts"
                >
                  <span
                    className={classes.imageSrc}
                    style={{
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: "cover",
                    }}
                  />
                  <span className={classes.imageBackdrop} />
                  <span className={classes.imageButton}>
                    <Typography
                      component="span"
                      variant="subtitle1"
                      color="inherit"
                      className={classes.imageTitle}
                    >
                      {item.title}
                      <span className={classes.imageMarked} />
                    </Typography>
                  </span>
                </ButtonBase>{" "}
              </div>
            </Grid>
          ))}
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          style={{ paddingTop: "50px" }}
        >
          <Button
            aria-label="View all blog posts"
            variant="contained"
            className="main-button"
            href="/blogs"
          >
            <p className="button-text">View All</p>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  appbar: state.appbar,
  blogs: state.blogs,
});

export default connect(mapStateToProps, {
  updateAppbar,
  getLatestBlogs,
})(HomePage);
