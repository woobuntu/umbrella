import { grayColor, title } from "assets/jss/material-kit-pro-react.js";

const careerStyle = (theme) => ({
  section: {
    paddingBottom: "0",
    backgroundPosition: "50%",
    backgroundSize: "cover",
    padding: "70px 0",
    "& p": {
      fontSize: "1.188rem",
      lineHeight: "1.5em",
      color: grayColor[15],
      marginBottom: "30px",
    },
  },
  title,
  nested: {
    paddingLeft: theme.spacing(4),
  },
});

export default careerStyle;
