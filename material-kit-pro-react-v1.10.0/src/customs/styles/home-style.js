import {
  container,
  title,
  whiteColor,
  main,
  mainRaised,
} from "../../assets/jss/material-kit-pro-react";

const homeStyle = {
  container: {
    color: whiteColor,
    ...container,
    zIndex: "2",
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    color: whiteColor,
    textDecoration: "none",
    fontFamily: `'Song Myung', serif`,
  },
  main,
  mainRaised,
};

export default homeStyle;
