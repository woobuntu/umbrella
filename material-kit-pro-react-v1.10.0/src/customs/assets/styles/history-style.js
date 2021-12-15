import {
  container,
  title,
  whiteColor,
  main,
  mainRaised,
} from "assets/jss/material-kit-pro-react.js";

const historyStyle = {
  container: {
    ...container,
    zIndex: "2",
  },
  textCenter: {
    textAlign: "center",
  },
  title: {
    ...title,
    color: whiteColor,
  },
  main: {
    ...main,
    ...mainRaised,
  },
};

export default historyStyle;
