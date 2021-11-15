import {
  section,
  container,
  coloredShadow,
  cardTitle,
  grayColor,
} from "assets/jss/material-kit-pro-react";

const sectionCatalogsStyle = {
  section: {
    ...section,
    padding: "70px 0px",
  },
  container,
  coloredShadow,
  textCenter: {
    textAlign: "center",
  },
  cardTitle,
  cardDescription: {
    color: grayColor[0],
    textAlign: "center",
  },
  priceContainer: {
    display: "inline-flex",
  },
  price: {
    fontSize: "18px",
    color: grayColor[22],
  },
};

export default sectionCatalogsStyle;
