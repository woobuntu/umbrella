import {
  container,
  main,
  mainRaised,
  grayColor,
  title,
  whiteColor,
} from "assets/jss/material-kit-pro-react.js";

const documentStyle = {
  main: {
    ...main,
    ...mainRaised,
  },
  container: {
    ...container,
    zIndex: "2",
  },
  section: {
    paddingBottom: "0",
    backgroundPosition: "50%",
    backgroundSize: "cover",
    padding: "70px 0",
    "& p": {
      fontSize: "1.188rem",
      lineHeight: "1.5em",
      color: grayColor[15],
      marginBottom: "30px",
    },
  },
  parallaxTitle: {
    ...title,
    color: whiteColor,
  },
  title,
  textCenter: {
    textAlign: "center",
  },
};

export default documentStyle;
