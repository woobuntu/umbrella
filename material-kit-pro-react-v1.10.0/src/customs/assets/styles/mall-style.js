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
};

export default mallStyle;
