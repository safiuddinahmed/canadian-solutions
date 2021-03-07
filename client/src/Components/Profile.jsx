import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Card,
  TextField,
  Select,
  FormControl,
  Modal,
  MenuItem,
  Button,
  CardActionArea,
  CardContent,
} from "@material-ui/core";
import BackdropFilter from "react-backdrop-filter";
import moment from "moment";

import { updateAppbar } from "../actions/AppbarActions";
import { getBusiness, updateBusiness } from "../actions/BusinessesActions";
import { getUserPosts } from "../actions/ForumsActions";

import CurrentPost from "./CurrentPost";
import Chart from "./Chart";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(1),
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Profile = ({
  updateAppbar,
  forums: { userPosts },
  getBusiness,
  updateBusiness,
  businesses: { currentBusiness },
  getUserPosts,
}) => {
  const classes = useStyles();

  useEffect(() => {
    updateAppbar(4);
    getBusiness();
    getUserPosts();
    // eslint-disable-next-line
  }, []);

  const [business, setBusiness] = useState({});

  useEffect(() => {
    setBusiness({
      ...business,
      name: currentBusiness.name,
      email: currentBusiness.email,
      businessName: currentBusiness.businessName,
      industry: currentBusiness.industry,
      description: currentBusiness.description,
      productDetails: currentBusiness.productDetails,
      address: currentBusiness.address,
      phone: currentBusiness.phone,
      url: currentBusiness.url,
    });
    // eslint-disable-next-line
  }, [currentBusiness]);

  const updateClick = () => {
    updateBusiness(business);
  };

  const [blur, setBlur] = useState(null);

  const [openPost, setOpenPost] = useState(false);

  const handleClosePost = () => {
    setOpenPost(false);
    setBlur("blur(0px)");
  };

  const [postID, setPostID] = useState("");

  const viewPost = (id) => {
    setOpenPost(true);
    setBlur("blur(5px)");
    setPostID(id);
  };

  var disableUpdate = false;
  var message = "";

  if (
    !business.name ||
    !business.businessName ||
    !business.email ||
    !business.industry ||
    !business.description ||
    !business.productDetails ||
    !business.address ||
    !business.url ||
    !business.phone
  ) {
    disableUpdate = true;
    message = "Please fill in all the fields.";
  } else {
    disableUpdate = false;
    message = "";
  }
  const businessForm = (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item md={6} sm={6} style={{ textAlign: "left" }}>
        <Typography variant="subtitle1" style={{ fontWeight: "900" }}>
          Name
        </Typography>
        <TextField
          variant="filled"
          defaultValue={currentBusiness.name}
          value={business.name}
          error={!business.name}
          inputProps={{ maxLength: 30 }}
          onChange={(e) => setBusiness({ ...business, name: e.target.value })}
          fullWidth
          margin="dense"
        />
      </Grid>
      <Grid item md={6} sm={6} style={{ textAlign: "left" }}>
        <Typography variant="subtitle1" style={{ fontWeight: "900" }}>
          Business Name
        </Typography>
        <TextField
          variant="filled"
          fullWidth
          margin="dense"
          defaultValue={currentBusiness.businessName}
          value={business.businessName}
          error={!business.businessName}
          inputProps={{ maxLength: 30 }}
          onChange={(e) =>
            setBusiness({
              ...business,
              businessName: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item md={6} sm={6} style={{ textAlign: "left" }}>
        <Typography variant="subtitle1" style={{ fontWeight: "900" }}>
          Email
        </Typography>
        <TextField
          variant="filled"
          fullWidth
          margin="dense"
          defaultValue={currentBusiness.email}
          value={business.email}
          error={!business.email}
          onChange={(e) => setBusiness({ ...business, email: e.target.value })}
        />
      </Grid>

      <Grid item md={6} sm={6} style={{ textAlign: "left" }}>
        <Typography variant="subtitle1" style={{ fontWeight: "900" }}>
          Industry
        </Typography>
        <FormControl className={classes.formControl}>
          <Select
            margin="dense"
            variant="filled"
            labelId="select-industry"
            id="select-industry"
            defaultValue={currentBusiness.industry}
            value={business.industry}
            error={!business.industry}
            onChange={(e) =>
              setBusiness({
                ...business,
                industry: e.target.value,
              })
            }
          >
            <MenuItem value={"Art"}>Art</MenuItem>
            <MenuItem value={"Automotive"}>Automotive</MenuItem>
            <MenuItem value={"Construction"}>Construction</MenuItem>
            <MenuItem value={"Consultancy"}>Consultancy</MenuItem>
            <MenuItem value={"Education"}>Education</MenuItem>
            <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
            <MenuItem value={"Finance"}>Finance</MenuItem>
            <MenuItem value={"Food and Beverage"}>Food and Beverage</MenuItem>
            <MenuItem value={"Marketing"}>Marketing</MenuItem>
            <MenuItem value={"Real Estate"}>Real Estate</MenuItem>
            <MenuItem value={"Technology"}>Technology</MenuItem>
            <MenuItem value={"Transportation"}>Transportation</MenuItem>
          </Select>
        </FormControl>
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
          defaultValue={currentBusiness.description}
          value={business.description}
          error={!business.description}
          inputProps={{ maxLength: 300 }}
          onChange={(e) =>
            setBusiness({
              ...business,
              description: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item md={12} sm={12} style={{ textAlign: "left" }}>
        <Typography variant="subtitle1" style={{ fontWeight: "900" }}>
          Product Details
        </Typography>
        <TextField
          variant="filled"
          fullWidth
          multiline
          margin="dense"
          defaultValue={currentBusiness.productDetails}
          value={business.productDetails}
          error={!business.productDetails}
          inputProps={{ maxLength: 350 }}
          onChange={(e) =>
            setBusiness({
              ...business,
              productDetails: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item md={12} sm={12} style={{ textAlign: "left" }}>
        <Typography variant="subtitle1" style={{ fontWeight: "900" }}>
          Address
        </Typography>
        <TextField
          variant="filled"
          fullWidth
          multiline
          margin="dense"
          defaultValue={currentBusiness.address}
          value={business.address}
          error={!business.address}
          inputProps={{ maxLength: 100 }}
          onChange={(e) =>
            setBusiness({ ...business, address: e.target.value })
          }
        />
      </Grid>
      <Grid item md={6} sm={6} style={{ textAlign: "left" }}>
        <Typography variant="subtitle1" style={{ fontWeight: "900" }}>
          Website Link
        </Typography>
        <TextField
          variant="filled"
          fullWidth
          margin="dense"
          defaultValue={currentBusiness.url}
          value={business.url}
          error={!business.url}
          onChange={(e) => setBusiness({ ...business, url: e.target.value })}
        />
      </Grid>
      <Grid item md={6} sm={6} style={{ textAlign: "left" }}>
        <Typography variant="subtitle1" style={{ fontWeight: "900" }}>
          Phone
        </Typography>
        <TextField
          variant="filled"
          fullWidth
          margin="dense"
          defaultValue={currentBusiness.phone}
          value={business.phone}
          error={!business.phone}
          inputProps={{ maxLength: 10 }}
          onChange={(e) => setBusiness({ ...business, phone: e.target.value })}
        />
      </Grid>
      <Grid item md={12} sm={12} style={{ textAlign: "left" }}>
        <Typography variant="body2" style={{ fontWeight: "bold" }}>
          No need to add http in the website link field. Please contact our
          support if you encounter any issues or need help.
        </Typography>
        <Typography
          variant="body2"
          style={{ fontWeight: "bold", color: "red" }}
        >
          {message}
        </Typography>
      </Grid>
      <Grid item md={4} sm={4}></Grid>
      <Grid item md={4} sm={4}></Grid>
      <Grid item md={4} sm={4}>
        <Button
          variant="text"
          style={{
            backgroundColor:
              disableUpdate === true
                ? "rgba(250, 58, 0, 0.25)"
                : "rgba(0,0,0, 0.05)",
            color: disableUpdate === true ? "red" : "black",
            width: "100%",
          }}
          onClick={updateClick}
          disabled={disableUpdate}
        >
          {disableUpdate ? "Field(s) empty" : "Update"}
        </Button>
      </Grid>
    </Grid>
  );

  const content = (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={3}
    >
      {userPosts.map((item) => (
        <Grid item md={12} lg={12} sm={12} xs={12} xl={12}>
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
              className="inside-container"
              style={{
                backgroundColor: "transparent",
                // backgroundColor: "rgb(0,0,0)",
                // backgroundColor: "rgba(0,0,0, 0.08)",
                display: "flex",
              }}
            >
              <CardActionArea onClick={() => viewPost(item._id)}>
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
                      <Typography variant="subtitle1" color="textSecondary">
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
          </BackdropFilter>
        </Grid>
      ))}
    </Grid>
  );
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
          <Grid item md={3} xs={12} sm={12} style={{ padding: "30px" }}>
            <br></br>
            <Typography
              variant="h4"
              style={{ textAlign: "left", fontWeight: "900" }}
            >
              Business Details
            </Typography>
            <Typography variant="body2" style={{ textAlign: "left" }}>
              We will use this information to display your business' details.
            </Typography>
          </Grid>
          <Grid item md={8} xs={12} sm={12} style={{ padding: "30px" }}>
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
                {currentBusiness !== "" && businessForm}

                {currentBusiness === "" && businessForm}
              </Card>
            </BackdropFilter>
          </Grid>
        </Grid>
      </div>
      <div
        className="inside-container"
        style={{
          backgroundColor: "rgba(0,0,0, 0.08)",
          marginTop: "60px",
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
          <Grid item md={3} xs={12} sm={12} style={{ padding: "30px" }}>
            <br></br>
            <Typography
              variant="h4"
              style={{ textAlign: "left", fontWeight: "900" }}
            >
              Your Posts
            </Typography>
            <Typography variant="body2" style={{ textAlign: "left" }}>
              Take a look at the discussions you have started. Click on a forum
              post to expand it and view it. You can also view comments and make
              new ones.
            </Typography>
          </Grid>
          <Grid item md={8} xs={12} sm={12} style={{ padding: "30px" }}>
            {content}
          </Grid>
        </Grid>

        <Modal
          open={openPost}
          onClose={handleClosePost}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <CurrentPost postID={postID} />
        </Modal>
      </div>

      <div
        className="inside-container"
        style={{
          backgroundColor: "rgba(0,0,0, 0.08)",
          marginTop: "60px",
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
          <Grid item md={3} xs={12} sm={12} style={{ padding: "30px" }}>
            <br></br>
            <Typography
              variant="h4"
              style={{ textAlign: "left", fontWeight: "900" }}
            >
              Your Performance
            </Typography>
            <Typography variant="body2" style={{ textAlign: "left" }}>
              View how much traffic Canadian Solutions generated for you in the
              past week.
            </Typography>
          </Grid>
          <Grid item md={8} xs={12} sm={12} style={{ padding: "30px" }}>
            <Chart />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  forums: state.forums,
  businesses: state.businesses,
});

export default connect(mapStateToProps, {
  updateAppbar,
  getBusiness,
  updateBusiness,
  getUserPosts,
})(Profile);
