import { container, mlAuto } from "assets/jss/material-kit-pro-react.js";

const productParallaxStyle = {
  pageHeader: {
    minHeight: "60vh",
    maxHeight: "600px",
    height: "auto",
    backgroundPosition: "top center",
  },
  container: {
    ...container,
    zIndex: 2,
  },
  titleRow: {
    marginTop: "-8vh",
  },
  mlAuto,
  floatRight: {
    float: "right!important",
  },
};

export default productParallaxStyle;
