import {
  main,
  mainRaised,
  container,
  grayColor,
} from "assets/jss/material-kit-pro-react.js";

import imagesStyles from "assets/jss/material-kit-pro-react/imagesStyles.js";

const introductionStyle = {
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
  ...imagesStyles,
};

export default introductionStyle;
