import {
  container,
  mlAuto,
  mrAuto,
  title,
  whiteColor,
} from "assets/jss/material-kit-pro-react.js";

const basketParallaxStyle = {
  container: {
    ...container,
    zIndex: 1,
  },
  mlAuto,
  mrAuto,
  textCenter: {
    textAlign: "center",
  },
  title: {
    ...title,
    "&, & + h4": {
      color: whiteColor,
    },
  },
};

export default basketParallaxStyle;
