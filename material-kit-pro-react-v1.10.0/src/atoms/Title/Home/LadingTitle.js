import { makeStyles } from "@material-ui/styles";
import React from "react";
import Title from "../Title";

import { title, whiteColor } from "assets/jss/material-kit-pro-react";
import { isMobile } from "customs/utils";

const useStyles = makeStyles({
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    color: whiteColor,
    textDecoration: "none",
    fontFamily: `Noto Sans Korea`,
  },
});

export default function LandingTitle() {
  const classes = useStyles();
  const size = isMobile() ? 2 : 1;
  return (
    <Title className={classes.title} size={size}>
      함께쓰는우산
    </Title>
  );
}
