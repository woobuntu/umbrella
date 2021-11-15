import React, { Fragment } from "react";
import Parallax from "components/Parallax/Parallax.js";
import { profileParallaxStyle } from "customs/assets/styles/profile";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

const useStyles = makeStyles(profileParallaxStyle);

export default function ProfileParallax() {
  const parallaxUrl =
    "https://woobuntu-umbrella.s3.ap-northeast-2.amazonaws.com/%E1%84%92%E1%85%A1%E1%86%B7%E1%84%81%E1%85%A6%E1%84%8A%E1%85%B3%E1%84%82%E1%85%B3%E1%86%AB%E1%84%8B%E1%85%AE%E1%84%89%E1%85%A1%E1%86%AB.jpg";

  const classes = useStyles();

  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  return (
    <Fragment>
      <Parallax
        image={parallaxUrl}
        filter="dark"
        className={classes.parallax}
      />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6}>
              <div className={classes.profile}>
                <div>
                  <img src={parallaxUrl} className={imageClasses} />
                </div>
                <div className={classes.name}>
                  <h3 className={classes.title}>이름</h3>
                  <h6>직책</h6>
                </div>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </Fragment>
  );
}
