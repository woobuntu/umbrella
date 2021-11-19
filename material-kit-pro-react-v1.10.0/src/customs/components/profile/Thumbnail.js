import React from "react";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { thumbnailStyle } from "customs/assets/styles/profile";
import { makeStyles } from "@material-ui/core";
import christian from "assets/img/faces/christian.jpg";
import classNames from "classnames";
import PropTypes from "prop-types";

const useStyles = makeStyles(thumbnailStyle);

export default function Thumbnail({ executive }) {
  const classes = useStyles();

  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const { name, position, thumbnail } = executive;

  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={6}>
        <div className={classes.profile}>
          <div>
            <img src={thumbnail.path} alt="..." className={imageClasses} />
          </div>
          <div className={classes.name}>
            <h3 className={classes.title}>{name}</h3>
            <h6>{position}</h6>
          </div>
        </div>
      </GridItem>
    </GridContainer>
  );
}

Thumbnail.propTypes = {
  executive: PropTypes.object,
};
