import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Card, TextField, Button } from "@material-ui/core";
// import { Modal } from "react-router-modal";
// import { useHistory } from "react-router-dom";
import moment from "moment";

import {
  getCurrentPost,
  getComments,
  postComment,
} from "../actions/ForumsActions";

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
    height: "80vh",
    top: "55%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflow: "auto",
  },
  card: {
    height: "100%",
    width: "100%",
    color: "black",
    // minHeight: "50px",
    padding: "15px",
    backgroundColor: "rgba(0,0,0, 0.08)",
  },
}));

const CurrentPost = ({
  forums: { posts, comments, currentPost },
  postID,
  getCurrentPost,
  getComments,
  postComment,
}) => {
  useEffect(() => {
    getCurrentPost(postID);
    getComments(postID);
    // eslint-disable-next-line
  }, [comments]);

  const classes = useStyles();

  // const history = useHistory();

  // const handleClick = () => {
  //   history.push("/forums");
  // };

  const commentClick = () => {
    postComment(postID, comment);
  };

  const [comment, setComment] = useState({
    description: "",
  });

  return (
    // <Modal onBackdropClick={handleClick}>
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
            <Card className={classes.card}>
              <Typography variant="h5" style={{ fontWeight: "900" }}>
                {currentPost.title}
              </Typography>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  paddingBottom: "10px",
                }}
              >
                <Typography
                  variant="subtitle1"
                  // align="right"
                  color="textSecondary"
                >
                  {currentPost.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  // align="right"
                >
                  {moment(currentPost.date).format("LLL")}
                </Typography>
              </div>
              <Typography component="h6" variant="h6" paragraph="true">
                {currentPost.description}
              </Typography>
            </Card>
          </Grid>
          {comments.map((item) => (
            <Grid item md={12} sm={12} style={{ textAlign: "left" }}>
              <Card className={classes.card}>
                <div
                  style={{
                    margin: "auto",
                    alignItems: "center",
                    justifyContent: "left",
                    // display: "flex",
                    width: "100%",
                    minHeight: "60px",
                    // gap: "10px",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    style={{ fontWeight: "900" }}
                  >
                    {item.name} replied on {moment(item.date).format("LLL")}:
                  </Typography>
                  <Typography variant="h6" align="justify">
                    {item.description}
                  </Typography>
                </div>
              </Card>
            </Grid>
          ))}
          <Grid item md={8} sm={12} xs={12} style={{ textAlign: "left" }}>
            <TextField
              label="Post your comment"
              variant="filled"
              fullWidth
              multiline
              margin="dense"
              defaultValue={comment.description}
              onChange={(e) =>
                setComment({ ...comment, description: e.target.value })
              }
            />
          </Grid>
          <Grid item md={4} sm={12} xs={12} style={{ height: "100%" }}>
            <Button
              variant="text"
              onClick={commentClick}
              style={{
                backgroundColor: "rgba(0,0,0, 0.05)",
                width: "100%",
                color: "black",
              }}
            >
              Comment
            </Button>
          </Grid>
        </Grid>
      </Card>
    </div>
    // </Modal>
  );
};

const mapStateToProps = (state) => ({
  forums: state.forums,
});

export default connect(mapStateToProps, {
  getCurrentPost,
  getComments,
  postComment,
})(CurrentPost);
