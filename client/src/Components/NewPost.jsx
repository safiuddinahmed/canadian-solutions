import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Card, TextField, Button } from "@material-ui/core";

import { newForumPost } from "../actions/ForumsActions";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(1),
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
    position: "absolute",
    backgroundColor: "#8EC5FC",
    backgroundImage: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "45vw",
    top: "55%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const NewPost = ({ newForumPost, forums: { posts, comments } }) => {
  const classes = useStyles();

  const [post, setPost] = useState({
    title: "",
    description: "",
  });

  const postClick = () => {
    newForumPost(post);
  };
  return (
    <div className={classes.paper}>
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
          <Grid item md={12} sm={12} style={{ textAlign: "left" }}>
            <Typography variant="subtitle1" style={{ fontWeight: "900" }}>
              Title
            </Typography>
            <TextField
              variant="filled"
              fullWidth
              multiline
              margin="dense"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
            />
          </Grid>
          <Grid item md={12} sm={12} style={{ textAlign: "left" }}>
            <Typography variant="subtitle1" style={{ fontWeight: "900" }}>
              Description
            </Typography>
            <TextField
              variant="filled"
              fullWidth
              multiline
              margin="dense"
              value={post.description}
              onChange={(e) =>
                setPost({ ...post, description: e.target.value })
              }
            />
          </Grid>
          <Grid item md={12} sm={12} style={{ textAlign: "left" }}>
            <Typography variant="body2" style={{ fontWeight: "bold" }}>
              Please contact our support if you encounter any issues or need
              help.
            </Typography>
          </Grid>
          <Grid item md={4} sm={4}></Grid>
          <Grid item md={4} sm={4}></Grid>
          <Grid item md={4} sm={4}>
            <Button
              variant="text"
              onClick={postClick}
              style={{
                backgroundColor: "rgba(0,0,0, 0.05)",
                width: "100%",
                color: "black",
              }}
            >
              Post
            </Button>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => ({
  forums: state.forums,
});

export default connect(mapStateToProps, {
  newForumPost,
})(NewPost);
