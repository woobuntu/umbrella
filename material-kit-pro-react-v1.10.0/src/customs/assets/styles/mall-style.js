import {
  container,
  mlAuto,
  mrAuto,
  whiteColor,
  title,
  main,
  mainRaised,
} from "assets/jss/material-kit-pro-react";

const mallStyle = {
  container: {
    ...container,
    zIndex: "2",
  },
  mlAuto,
  mrAuto,
  textCenter: {
    textAlign: "center !important",
  },
  brand: {
    "& h1, & h4": {
      color: whiteColor,
    },
  },
  title,
  main,
  mainRaised,
  features: {
    padding: "80px 0",
    "& $phoneContainer": {
      maxWidth: "220px",
      margin: "0 auto",
    },
  },
  phoneContainer: {
    "& img": {
      width: "100%",
    },
  },
  infoArea: {
    maxWidth: "none",
    margin: "0 auto",
    padding: "10px 0 0px",
  },
};

export default mallStyle;
