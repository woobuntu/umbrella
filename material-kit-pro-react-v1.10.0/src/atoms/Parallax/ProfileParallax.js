import { makeStyles } from "@material-ui/styles";
import React from "react";
import BaseParallax from "./BaseParallax";

const useStyles = makeStyles({
  parallax: {
    height: "380px",
    backgroundPosition: "top center",
  },
});

export default function ProfileParallax() {
  const classes = useStyles();
  // profileParallax는 추후 다른 이미지로 교체
  return <BaseParallax className={classes.parallax} />;
}
