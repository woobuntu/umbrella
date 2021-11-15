import {
  grayColor,
  primaryColor,
  whiteColor,
  primaryBoxShadow,
} from "assets/jss/material-kit-pro-react.js";

const optionStyle = {
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

export default optionStyle;
