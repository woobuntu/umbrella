import {
  container,
  mlAuto,
  section,
  grayColor,
  main,
  mainRaised,
  title,
  primaryColor,
  whiteColor,
  primaryBoxShadow,
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
      maxWidth: "300px",
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
  pullRight: {
    float: "right",
  },
  title: {
    ...title,
    marginBottom: 0,
  },
  mainPrice: {
    margin: "10px 0px 25px",
  },
  selectFormControl: {
    margin: "10px 1px 10px 0px !important",
    "& > div": {
      "&:before": {
        borderBottomWidth: "1px !important",
        borderBottomColor: grayColor[11] + " !important",
      },
      "&:after": {
        borderBottomColor: primaryColor[0] + "!important",
      },
    },
  },
  selectMenuItem: {
    fontSize: "13px",
    padding: "10px 20px",
    margin: "0 5px",
    borderRadius: "2px",
    transition: "all 150ms linear",
    display: "block",
    clear: "both",
    fontWeight: "400",
    lineHeight: "2",
    whiteSpace: "nowrap",
    color: grayColor[8],
    paddingRight: "30px",
    "&:hover": {
      backgroundColor: primaryColor[0],
      color: whiteColor,
      ...primaryBoxShadow,
    },
  },
  selectMenuItemSelected: {
    backgroundColor: primaryColor[0] + "!important",
    color: whiteColor,
  },
};

export default productStyle;
