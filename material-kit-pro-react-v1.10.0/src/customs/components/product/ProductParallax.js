import React from "react";
import Parallax from "components/Parallax/Parallax";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { Link } from "react-router-dom";
import Button from "components/CustomButtons/Button.js";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import PropTypes from "prop-types";
import { productParallaxStyle } from "customs/assets/styles/product";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(productParallaxStyle);

export default function ProductParallax({ basketAmount }) {
  const parallaxUrl =
    "https://woobuntu-umbrella.s3.ap-northeast-2.amazonaws.com/%E1%84%91%E1%85%A9%E1%84%8C%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A1%E1%86%BC%E1%84%8C%E1%85%A1+big.jpg";

  const classes = useStyles();

  return (
    <Parallax image={parallaxUrl} filter="dark" className={classes.pageHeader}>
      <div className={classes.container}>
        <GridContainer className={classes.titleRow}>
          <GridItem md={4} className={classes.mlAuto}>
            <Link to="/basket">
              <Button color="white" className={classes.floatRight}>
                <ShoppingCart /> {basketAmount} items
              </Button>
            </Link>
          </GridItem>
        </GridContainer>
      </div>
    </Parallax>
  );
}

ProductParallax.propTypes = {
  basketAmount: PropTypes.number,
};
