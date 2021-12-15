import React from "react";
import PropTypes from "prop-types";

// atoms
import UmbrellaParallax from "./BaseParallax";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import BasketParallaxTitle from "atoms/Title/BasketParallaxTitle";

// styles
import { makeStyles } from "@material-ui/styles";
import {
  mlAuto,
  mrAuto,
  container,
} from "assets/jss/material-kit-pro-react.js";
import classNames from "classnames";
const useStyles = makeStyles({
  mlAuto,
  mrAuto,
  textCenter: {
    textAlign: "center",
  },
  container: {
    ...container,
    zIndex: 1,
  },
});

export default function BasketParallax() {
  const classes = useStyles();
  return (
    <UmbrellaParallax small>
      <div className={classes.container}>
        <GridContainer>
          <GridItem
            md={8}
            sm={8}
            className={classNames(
              classes.mlAuto,
              classes.mrAuto,
              classes.textCenter
            )}
          >
            <BasketParallaxTitle />
          </GridItem>
        </GridContainer>
      </div>
    </UmbrellaParallax>
  );
}

BasketParallax.propTypes = {};
