import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Card,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import BackdropFilter from "react-backdrop-filter";

import { updateAppbar } from "../actions/AppbarActions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: "bold",
  },
}));

const Faq = ({ updateAppbar }) => {
  useEffect(() => {
    updateAppbar(6);
    // eslint-disable-next-line
  }, []);

  const classes = useStyles();

  const accordionContent = [
    {
      question: "How do I register an account?",
      answer:
        "Please contact our customer service team at safiuddinahmed.mohammad@gmail.com to register an account.",
    },
    {
      question:
        "I am not able to access my website from the “Visit Website” button on the Businesses page.",
      answer:
        "You might not be able to access the website because you didn’t use the correct format for the url of your website. Please remove the “http” or “https” part of the url and try again. If you still encounter any problems, please contact our customer service team at safiuddinahmed.mohammad@gmail.com",
    },
    {
      question: "I can’t access the forums, blogs, or profile pages.",
      answer:
        "In order to access these pages, you need to register an account with us.",
    },
    {
      question:
        "I would like to report a user for cyber-bullying, harassment, or inappropriate content.",
      answer:
        "In order to report a user, please send an email to our customer service team at safiuddinahmed.mohammad@gmail.com and describe your issue in detail with the name of the user and the post/comment you’re referring to.",
    },
    {
      question: "What devices can I use this web app on?",
      answer:
        "This web app can be used on any device that supports a browser. A phone in landscape mode or a device larger than that would be ideal.",
    },
  ];
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
              Frequently Asked Questions
            </Typography>
            <Typography variant="body2" style={{ textAlign: "left" }}>
              Please contact our customer service team if you have any other
              questions.
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
                  padding: "5%",
                  backgroundColor: "transparent",
                  color: "black",
                  boxShadow: "none",
                }}
              >
                {accordionContent.map((item) => (
                  <Accordion style={{ backgroundColor: "rgba(0,0,0, 0.06)" }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="faq-content"
                      id="faq-header"
                    >
                      <Typography className={classes.heading}>
                        {item.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ padding: "3%" }}>
                      <Typography paragraph="true" align="justify">
                        {item.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Card>
            </BackdropFilter>
          </Grid>
          {/* <Grid item md={3} xs={12} sm={12}></Grid> */}
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  updateAppbar,
})(Faq);
