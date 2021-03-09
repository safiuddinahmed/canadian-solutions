import React, { useState } from "react";
import { Typography, Grid } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const [links, setLinks] = useState([
    {
      title: "businesses",
    },
    {
      title: "blogs",
    },
    {
      title: "forums",
    },
    {
      title: "profile",
    },
    {
      title: "FAQs",
    },
  ]);
  return (
    <div className="footer">
      <Grid container direction="row" justify="center">
        <Grid container direction="row" justify="center" md={8} spacing={2}>
          <Grid item md={4}>
            <Typography variant="h6" align="center" paragraph="true">
              Contact Info
            </Typography>
            <Typography variant="body1" align="center">
              safiuddinahmed.mohammad@gmail.com
            </Typography>
            <Typography variant="body1" align="center">
              (647)-786-2161
            </Typography>
            <Typography variant="body1" align="center">
              Toronto, ON, Canada
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography variant="h6" align="center" paragraph="true">
              Quick Links
            </Typography>
            {links.map((item) => (
              <Typography
                key={item.title}
                variant="body1"
                align="center"
                style={{ textTransform: "capitalize", cursor: "pointer" }}
                onClick={() => window.location.assign(`/${item.title}`)}
              >
                {item.title}
              </Typography>
            ))}
          </Grid>
          <Grid
            container
            direction="row"
            justify="center"
            item
            md={4}
            spacing={2}
          >
            <Grid item md={12}>
              <Typography variant="h6" align="center" paragraph="true">
                Find us on social media
              </Typography>
            </Grid>
            <Grid item md={4}>
              <Typography variant="h5" align="center">
                <FontAwesomeIcon icon={faTwitter} />
              </Typography>
            </Grid>
            <Grid item md={4}>
              <Typography variant="h5" align="center">
                <FontAwesomeIcon icon={faFacebook} />
              </Typography>
            </Grid>
            <Grid item md={4}>
              <Typography variant="h5" align="center">
                <FontAwesomeIcon icon={faInstagram} />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Typography
        variant="caption text"
        style={{ paddingTop: "20px" }}
        paragraph="true"
      >
        © 2021 CANADIAN SOLUTIONS ALL RIGHTS RESERVED
      </Typography>
      <Typography variant="caption">
        <div>
          Icons made by{" "}
          <a href="https://www.freepik.com" title="Freepik">
            Freepik
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
      </Typography>
    </div>
  );
};

export default Footer;
