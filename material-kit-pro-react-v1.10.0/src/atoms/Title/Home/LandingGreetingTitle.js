import { makeStyles } from "@material-ui/styles";
import React, { Fragment } from "react";
import Title from "../Title";

import { title } from "assets/jss/material-kit-pro-react.js";

const useStyles = makeStyles({
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
  },
});

export default function LandingGreetingTitle() {
  const classes = useStyles();
  return (
    <Fragment>
      <Title size={2} className={classes.title}>
        안녕하십니까? ‘함께쓰는우산’과 뜻을 함께 해주시는 여러분!
      </Title>
    </Fragment>
  );
}
