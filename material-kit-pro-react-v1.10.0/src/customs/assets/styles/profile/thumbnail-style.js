import { title } from "assets/jss/material-kit-pro-react.js";

import imagesStyle from "assets/jss/material-kit-pro-react/imagesStyles.js";

const thumbnailStyle = {
  profile: {
    textAlign: "center",
    "& img": {
      maxWidth: "160px",
      width: "100%",
      margin: "0 auto",
      transform: "translate3d(0, -50%, 0)",
    },
  },
  ...imagesStyle,
  name: {
    marginTop: "-80px",
  },
  title: {
    ...title,
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
  },
};

export default thumbnailStyle;
