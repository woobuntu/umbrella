import {
  container,
  section,
  grayColor,
  main,
  mainRaised,
  title,
} from "assets/jss/material-kit-pro-react.js";

const productStyle = {
  productPage: {
    backgroundColor: grayColor[2],
    "& $mainRaised": {
      margin: "-40vh 0 0",
      padding: "40px",
    },
    "& .image-gallery-slide img": {
      borderRadius: "3px",
      height: "auto",
    },
    "& .image-gallery-swipe": {
      margin: "30px 0px",
      overflow: "hidden",
      width: "100%",
      height: "auto",
      textAlign: "center",
    },
    "& .image-gallery-thumbnails > .image-gallery-thumbnails-container .image-gallery-thumbnail":
      {
        "&.active > .image-gallery-thumbnail-inner": {
          opacity: "1",
          borderColor: grayColor[6],
        },
        "& > .image-gallery-thumbnail-inner": {
          width: "80%",
          maxWidth: "85px",
          margin: "0 auto",
          padding: "8px",
          display: "block",
          border: "1px solid transparent",
          background: "transparent",
          borderRadius: "3px",
          opacity: ".8",
        },
        "& > .image-gallery-thumbnail-inner img": {
          borderRadius: "3px",
          width: "100%",
          height: "auto",
          textAlign: "center",
        },
      },
  },
  container: {
    ...container,
    zIndex: 2,
  },
  section: {
    ...section,
    padding: "70px 0px",
  },
  sectionGray: {
    background: grayColor[14],
  },
  main,
  mainRaised,
  pickSize: {
    marginTop: "50px",
  },
  title: {
    ...title,
    marginBottom: 0,
  },
  mainPrice: {
    margin: "10px 0px 25px",
  },
  textCenter: {
    textAlign: "center!important",
  },
  features: {
    paddingTop: "30px",
  },
};

export default productStyle;
