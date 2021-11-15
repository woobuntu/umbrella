import {
  container,
  main,
  mainRaised,
  title,
} from "assets/jss/material-kit-pro-react.js";

import imagesStyle from "assets/jss/material-kit-pro-react/imagesStyles.js";

const profileParallaxStyle = {
  parallax: {
    height: "380px",
    backgroundPosition: "top center",
  },
  container,
  ...imagesStyle,
  main: {
    ...main,
  },
  mainRaised: {
    ...mainRaised,
  },
  profile: {
    textAlign: "center",
    "& img": {
      maxWidth: "160px",
      width: "100%",
      margin: "0 auto",
      transform: "translate3d(0, -50%, 0)",
    },
  },
  name: {
    marginTop: "-80px",
  },
  title: {
    ...title,
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
  },
};

export default profileParallaxStyle;
