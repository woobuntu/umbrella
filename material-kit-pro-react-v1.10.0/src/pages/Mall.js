import Parallax from "components/Parallax/Parallax";
import React, { useEffect } from "react";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

import { mallStyle } from "customs/assets/styles";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import { SectionCatalogs } from "customs/components";

const useStyles = makeStyles(mallStyle);

export default function Mall() {
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });

  const parallaxUrl =
    "https://woobuntu-umbrella.s3.ap-northeast-2.amazonaws.com/%E1%84%92%E1%85%A1%E1%86%B7%E1%84%81%E1%85%A6%E1%84%8A%E1%85%B3%E1%84%82%E1%85%B3%E1%86%AB%E1%84%8B%E1%85%AE%E1%84%89%E1%85%A1%E1%86%AB.jpg";

  return (
    <div>
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
              <div className={classes.brand}>
                <h1 className={classes.title}>Ecommerce Page!</h1>
                <h4>
                  Free global delivery for all products. Use coupon{" "}
                  <b>25summer</b> for an extra 25% Off
                </h4>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <SectionCatalogs />
      </div>
    </div>
  );
}
