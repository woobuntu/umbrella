import React, { useState, useEffect } from "react";

import {
  container,
  title,
  main,
  whiteColor,
  mainRaised,
} from "assets/jss/material-kit-pro-react.js";
import { makeStyles } from "@material-ui/styles";
import { useLocation } from "react-router-dom";
import BaseParallax from "./BaseParallax";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { Title } from "atoms/Title";
import { Link } from "react-router-dom";

const style = {
  container: {
    ...container,
    zIndex: "2",
    position: "relative",
  },
  textCenter: {
    textAlign: "center",
  },
  title: {
    ...title,
    color: whiteColor,
  },
};

const useStyles = makeStyles(style);

export default function BlogParallax() {
  const classes = useStyles();

  const [title, setTitle] = useState("");

  const { pathname } = useLocation();

  useEffect(() => {
    switch (pathname.split("/")[1]) {
      case "performances":
        setTitle("활동실적");
        break;
      case "notifications":
        setTitle("공지사항");
        break;
    }
  }, [pathname]);
  return (
    <BaseParallax small>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8} className={classes.textCenter}>
            <Link to={`/${pathname.split("/")[1]}`}>
              <Title size={2} className={classes.title}>
                {title}
              </Title>
            </Link>
          </GridItem>
        </GridContainer>
      </div>
    </BaseParallax>
  );
}
