import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Card,
  Button,
  CardMedia,
  CardContent,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core";
// import BackdropFilter from "react-backdrop-filter";
import moment from "moment";

import { updateAppbar } from "../actions/AppbarActions";
import { getBlogs } from "../actions/BlogsActions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  content: {
    flex: "1 0 auto",
    width: "100%",
  },
  cover: {
    width: "60%",
    backgroundSize: "cover",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  navigation: {
    width: 500,
    background: "transparent",
    backgroundColor: "rgba(0,0,0, 0.08)",
  },
}));

const Blogs = ({ updateAppbar, blogs: { blogs }, getBlogs }) => {
  useEffect(() => {
    updateAppbar(2);
    getBlogs();
    // eslint-disable-next-line
  }, []);

  const classes = useStyles();

  const [sort, setSort] = useState("date");

  const sortChange = (event, newValue) => {
    setSort(newValue);
  };

  const propComparator = (propName) => (a, b) => {
    if (sort === "date") {
      return a[propName] === b[propName]
        ? 0
        : a[propName] > b[propName]
        ? -1
        : 1;
    } else {
      return a[propName] === b[propName]
        ? 0
        : a[propName] < b[propName]
        ? -1
        : 1;
    }
  };

  const content = (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={3}
    >
      {blogs.sort(propComparator(sort)).map((item) => (
        <Grid item md={8} lg={8} sm={12} xs={12} xl={8}>
          {/* <BackdropFilter
            className="blurred"
            filter={"blur(10px)"}
            html2canvasOpts={{
              allowTaint: true,
            }}
            onDraw={() => {
              console.log("Rendered !");
            }}
          > */}
          <Card
            className="inside-container"
            style={{
              backgroundColor: "rgba(0,0,0, 0.08)",
              display: "flex",
            }}
          >
            <CardMedia
              className={classes.cover}
              image={item.image}
              title="Blog posts"
            />
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography
                  component="h5"
                  variant="h5"
                  style={{
                    fontFamily: "Scope One, sans-serif",
                    fontWeight: "bold",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {item.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {moment(item.date).format("LL")}
                </Typography>
              </CardContent>
              <div className={classes.controls}>
                <Button
                  variant="text"
                  style={{
                    backgroundColor: "rgba(0,0,0, 0.05)",
                    width: "50%",
                    height: "60%",
                    color: "white",
                  }}
                  href={item.url}
                  target="_blank"
                >
                  <p
                    className="button-text"
                    style={{
                      color: "black",
                      fontWeight: "normal",
                    }}
                  >
                    Read More
                  </p>
                </Button>
              </div>
            </div>
          </Card>
          {/* </BackdropFilter> */}
        </Grid>
      ))}
    </Grid>
  );

  return (
    <div className="container">
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
        style={{ paddingBottom: "30px" }}
      >
        <BottomNavigation
          value={sort}
          onChange={sortChange}
          className={classes.navigation}
          showLabels="true"
        >
          <BottomNavigationAction label="Sort by title" value="title" />
          <BottomNavigationAction label="Sort by latest" value="date" />
          <BottomNavigationAction label="Sort by author name" value="name" />
        </BottomNavigation>
      </Grid>
      {content}
    </div>
  );
};

const mapStateToProps = (state) => ({
  blogs: state.blogs,
});

export default connect(mapStateToProps, {
  updateAppbar,
  getBlogs,
})(Blogs);
