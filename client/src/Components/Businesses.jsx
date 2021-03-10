import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Tabs,
  Tab,
  Box,
  Card,
  CardContent,
  Button,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPalette,
  faCar,
  faToolbox,
  faHandsHelping,
  faUserGraduate,
  faMusic,
  faMoneyBillWave,
  faHamburger,
  faPoll,
  faSign,
  faLaptop,
  faBusAlt,
} from "@fortawesome/free-solid-svg-icons";
import BackdropFilter from "react-backdrop-filter";

import { updateAppbar } from "../actions/AppbarActions";
import { getAllBusinesses } from "../actions/BusinessesActions";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // display: "flex",
    // height: "100%",
    backgroundColor: "rgba(0,0,0, 0.08)",
    borderRadius: "4px",
    paddingBottom: "5%",
  },
  tabs: {
    // borderRight: `1px solid ${theme.palette.divider}`,
    // borderLeft: `1px solid ${theme.palette.divider}`,
    // backgroundColor: "#b2dcfb",
  },
  tabPanel: {
    width: "100%",
    height: "100%",
  },
  card: {
    height: "100%",
    // boxShadow: "none",
    // background: "linear-gradient(62deg, #e6f2fe 100%, #f0e6fe 100%)",
    backgroundColor: "transparent",
    // backgroundColor: "rgb(0,0,0)",
    // backgroundColor: "rgba(0,0,0, 0.06)",
    color: "black",
    boxShadow: "none",
    minHeight: "100%",
  },
}));

const Businesses = ({
  updateAppbar,
  getAllBusinesses,
  businesses: { businesses },
}) => {
  const classes = useStyles();

  const [value, setValue] = useState(0);
  const [contentLabel, setContentLabel] = useState("Art");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 1) {
      setContentLabel("Automotive");
    } else if (newValue === 2) {
      setContentLabel("Construction");
    } else if (newValue === 3) {
      setContentLabel("Consultancy");
    } else if (newValue === 4) {
      setContentLabel("Education");
    } else if (newValue === 5) {
      setContentLabel("Entertainment");
    } else if (newValue === 6) {
      setContentLabel("Finance");
    } else if (newValue === 7) {
      setContentLabel("Food and Beverage");
    } else if (newValue === 8) {
      setContentLabel("Marketing");
    } else if (newValue === 9) {
      setContentLabel("Real Estate");
    } else if (newValue === 10) {
      setContentLabel("Technology");
    } else if (newValue === 11) {
      setContentLabel("Transportation");
    } else {
      setContentLabel("Art");
    }
  };

  useEffect(() => {
    updateAppbar(1);
    getAllBusinesses();
    // eslint-disable-next-line
  }, []);

  const content = (
    <Grid
      container
      direction="row"
      justify="center"
      align="stretch"
      spacing={3}
    >
      {businesses
        .filter((obj) => obj.industry.includes(`${contentLabel}`))
        .map((item) => {
          var disableLink = false;
          var buttonText = "Visit Website";

          if (item.url === "N/A") {
            disableLink = true;
            buttonText = "No Website Available";
          } else {
            disableLink = false;
            buttonText = "Visit Website";
          }
          return (
            <Grid item md={6} lg={6} sm={12} xs={12} xl={3}>
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
                <Card className={classes.card}>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h4"
                      paragraph="true"
                      style={{
                        fontWeight: "900",
                      }}
                    >
                      {item.businessName}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      align="justify"
                      paragraph="true"
                      style={{ fontWeight: "900" }}
                    >
                      {item.description}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      align="justify"
                      paragraph="true"
                      style={{ fontWeight: "900" }}
                    >
                      Product Details: {item.productDetails}
                    </Typography>
                    <Typography
                      variant="body2"
                      align="justify"
                      paragraph="true"
                      style={{ fontWeight: "900" }}
                    >
                      Contact info: {item.name} | {item.email} | {item.phone} |{" "}
                      {item.address}
                    </Typography>
                    <Button
                      variant="text"
                      disabled={disableLink}
                      style={{
                        backgroundColor:
                          disableLink === true
                            ? "rgba(250, 58, 0, 0.25)"
                            : "rgba(0,0,0, 0.05)",
                        color: disableLink === true ? "red" : "black",
                        width: "100%",
                        bottom: "0px",
                      }}
                      href={`//${item.url}`}
                      target="_blank"
                    >
                      <p
                        className="button-text"
                        style={{
                          color: "black",
                          fontWeight: "normal",
                        }}
                      >
                        {buttonText}
                      </p>
                    </Button>
                  </CardContent>
                </Card>
              </BackdropFilter>
            </Grid>
          );
        })}
    </Grid>
  );

  return (
    <div className="container">
      <div className={classes.root}>
        <Tabs
          variant="scrollable"
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          color="secondary"
          aria-label="Horizontal Tabs"
          className={classes.tabs}
        >
          <Tab
            label="Art"
            icon={<FontAwesomeIcon icon={faPalette} size="lg" />}
            {...a11yProps(0)}
          />
          <Tab
            label="Automotive"
            icon={<FontAwesomeIcon icon={faCar} size="lg" />}
            {...a11yProps(1)}
          />
          <Tab
            label="Construction"
            icon={<FontAwesomeIcon icon={faToolbox} size="lg" />}
            {...a11yProps(2)}
          />
          <Tab
            label="Consultancy"
            icon={<FontAwesomeIcon icon={faHandsHelping} size="lg" />}
            {...a11yProps(3)}
          />
          <Tab
            label="Education"
            icon={<FontAwesomeIcon icon={faUserGraduate} size="lg" />}
            {...a11yProps(4)}
          />
          <Tab
            label="Entertainment"
            icon={<FontAwesomeIcon icon={faMusic} size="lg" />}
            {...a11yProps(5)}
          />
          <Tab
            label="Finance"
            icon={<FontAwesomeIcon icon={faMoneyBillWave} size="lg" />}
            {...a11yProps(6)}
          />
          <Tab
            label="Food and Beverage"
            icon={<FontAwesomeIcon icon={faHamburger} size="lg" />}
            {...a11yProps(7)}
          />
          <Tab
            label="Marketing"
            icon={<FontAwesomeIcon icon={faPoll} size="lg" />}
            {...a11yProps(8)}
          />
          <Tab
            label="Real Estate"
            icon={<FontAwesomeIcon icon={faSign} size="lg" />}
            {...a11yProps(9)}
          />
          <Tab
            label="Technology"
            icon={<FontAwesomeIcon icon={faLaptop} size="lg" />}
            {...a11yProps(10)}
          />
          <Tab
            label="Transportation"
            icon={<FontAwesomeIcon icon={faBusAlt} size="lg" />}
            {...a11yProps(11)}
          />
        </Tabs>
        <TabPanel value={value} index={0} className={classes.tabPanel}>
          {content}
        </TabPanel>
        <TabPanel value={value} index={1} className={classes.tabPanel}>
          {content}
        </TabPanel>
        <TabPanel value={value} index={2} className={classes.tabPanel}>
          {content}
        </TabPanel>
        <TabPanel value={value} index={3} className={classes.tabPanel}>
          {content}
        </TabPanel>
        <TabPanel value={value} index={4} className={classes.tabPanel}>
          {content}
        </TabPanel>
        <TabPanel value={value} index={5} className={classes.tabPanel}>
          {content}
        </TabPanel>
        <TabPanel value={value} index={6} className={classes.tabPanel}>
          {content}
        </TabPanel>
        <TabPanel value={value} index={7} className={classes.tabPanel}>
          {content}
        </TabPanel>
        <TabPanel value={value} index={8} className={classes.tabPanel}>
          {content}
        </TabPanel>
        <TabPanel value={value} index={9} className={classes.tabPanel}>
          {content}
        </TabPanel>
        <TabPanel value={value} index={10} className={classes.tabPanel}>
          {content}
        </TabPanel>
        <TabPanel value={value} index={11} className={classes.tabPanel}>
          {content}
        </TabPanel>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  appbar: state.appbar,
  businesses: state.businesses,
});

export default connect(mapStateToProps, {
  updateAppbar,
  getAllBusinesses,
})(Businesses);
