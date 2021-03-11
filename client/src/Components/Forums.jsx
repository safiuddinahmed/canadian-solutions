import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  BottomNavigation,
  BottomNavigationAction,
  Modal,
} from "@material-ui/core";
import moment from "moment";
import { Fade } from "react-reveal";

import NewPost from "./NewPost";
import CurrentPost from "./CurrentPost";
import { updateAppbar } from "../actions/AppbarActions";
import { getAllPosts } from "../actions/ForumsActions";

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
    // width: "100%",
  },
  cover: {
    width: "50%",
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

const Forums = ({ updateAppbar, forums: { posts, comments }, getAllPosts }) => {
  var test = window.localStorage.getItem("postComment");

  useEffect(() => {
    updateAppbar(3);
    getAllPosts();
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

  const [blur, setBlur] = useState(null);

  const [openNew, setOpenNew] = useState(false);

  const handleCloseNew = () => {
    setOpenNew(false);
    setBlur("blur(0px)");
  };

  const newPost = () => {
    setOpenNew(true);
    setBlur("blur(5px)");
  };

  const [openPost, setOpenPost] = useState(false);

  const handleClosePost = () => {
    setOpenPost(false);
    setBlur("blur(0px)");
    // localStorage.removeItem("postComment");
  };

  const [postID, setPostID] = useState("");

  const viewPost = (id) => {
    setOpenPost(true);
    setBlur("blur(5px)");
    setPostID(id);
  };

  const content = (
    <Fade left cascade>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item>
          <Typography variant="body2" style={{ fontWeight: "bold" }}>
            Click on a forum post to expand it and view it. You can also view
            comments and make new ones.
          </Typography>
        </Grid>
        {posts.sort(propComparator(sort)).map((item) => (
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
              <CardActionArea onClick={() => viewPost(item._id)}>
                {/* <CardMedia
              className={classes.cover}
              image={item.image}
              title="Live from space album cover"
            /> */}
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
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "20px",
                        paddingBottom: "10px",
                      }}
                    >
                      <Typography variant="subtitle1" color="textSecondary">
                        {item.name}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        // align="right"
                      >
                        {moment(item.date).format("LLL")}
                      </Typography>
                    </div>
                    <Typography component="h6" variant="h6">
                      {item.description}
                    </Typography>
                  </CardContent>
                </div>
              </CardActionArea>
            </Card>
            {/* </BackdropFilter> */}
          </Grid>
        ))}
      </Grid>
    </Fade>
  );

  return (
    <div className="container" style={{ filter: blur }}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
        style={{ paddingBottom: "30px" }}
      >
        <Fade left cascade>
          <BottomNavigation
            value={sort}
            onChange={sortChange}
            className={classes.navigation}
            showLabels="true"
          >
            <BottomNavigationAction label="Create new post" onClick={newPost} />
            <BottomNavigationAction label="Sort by title" value="title" />
            <BottomNavigationAction label="Sort by latest" value="date" />
            <BottomNavigationAction label="Sort by author name" value="name" />
          </BottomNavigation>
        </Fade>
      </Grid>
      {content}
      <Modal
        open={openNew}
        onClose={handleCloseNew}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <NewPost />
      </Modal>
      <Modal
        open={openPost}
        onClose={handleClosePost}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <CurrentPost postID={postID} />
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  forums: state.forums,
});

export default connect(mapStateToProps, {
  updateAppbar,
  getAllPosts,
})(Forums);
