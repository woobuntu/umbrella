import {
  container,
  main,
  mainRaised,
} from "assets/jss/material-kit-pro-react.js";

const profileStyle = {
  parallax: {
    height: "380px",
    backgroundPosition: "top center",
  },
  main: {
    ...main,
  },
  mainRaised: {
    ...mainRaised,
  },
  container,
};

export default profileStyle;
