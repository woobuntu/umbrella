import {
  container,
  main,
  mainRaised,
  mlAuto,
  mrAuto,
  description,
} from "assets/jss/material-kit-pro-react.js";

const successStyle = {
  main,
  mainRaised,
  container: {
    ...container,
    zIndex: 1,
  },
  pricingSection: {
    padding: "80px 0px",
  },
  mlAuto,
  mrAuto,
  cardCategory: {
    ...description,
  },
  cardDescription: {
    ...description,
  },
  marginBottom30: {
    marginBottom: "30px",
  },
};

export default successStyle;
