const customFooterStyle = {
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0",
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0px",
    width: "auto",
  },
  left: {
    float: "left!important",
    display: "block",
  },
  right: {
    padding: "15px 0",
    margin: "0",
    float: "right",
  },
  linksVertical: {
    "& li": {
      display: "block !important",
      marginLeft: "-5px",
      marginRight: "-5px",
      "& a": {
        padding: "5px !important",
      },
    },
  },
  documentLink: {
    color: "#3c4858",
    "&:hover": {
      color: "#3c4858",
      textDecoration: "underline",
    },
  },
};

export default customFooterStyle;
