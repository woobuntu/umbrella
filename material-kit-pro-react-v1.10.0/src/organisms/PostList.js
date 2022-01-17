import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import {
  container,
  mlAuto,
  mrAuto,
  title,
} from "assets/jss/material-kit-pro-react.js";

const useStyles = makeStyles({
  blog: {
    padding: "50px 0",
  },
  container,
  mlAuto,
  mrAuto,
  title,
});

export default function PostList() {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.blog}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem
              xs={12}
              sm={12}
              md={10}
              className={classes.mlAuto + " " + classes.mrAuto}
            >
              <h2 className={classes.title}>활동실적</h2>
              <br />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </Fragment>
  );
}
