import React from "react";
import Parallax from "components/Parallax/Parallax";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

import { basketParallaxStyle } from "customs/assets/styles/basket";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";

const useStyles = makeStyles(basketParallaxStyle);

export default function BasketParallax() {
  const classes = useStyles();

  const parallaxUrl =
    "https://woobuntu-umbrella.s3.ap-northeast-2.amazonaws.com/%E1%84%92%E1%85%A1%E1%86%B7%E1%84%81%E1%85%A6%E1%84%8A%E1%85%B3%E1%84%82%E1%85%B3%E1%86%AB%E1%84%8B%E1%85%AE%E1%84%89%E1%85%A1%E1%86%AB.jpg";

  return (
    <Parallax image={parallaxUrl} filter="dark" small>
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
            <h2 className={classes.title}>장바구니</h2>
          </GridItem>
        </GridContainer>
      </div>
    </Parallax>
  );
}
