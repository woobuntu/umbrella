import React from "react";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { thumbnailStyle } from "customs/assets/styles/profile";
import { makeStyles } from "@material-ui/core";
import classNames from "classnames";
import PropTypes from "prop-types";
import basicThumbnail from "customs/assets/img/smiling-face.png";

const useStyles = makeStyles(thumbnailStyle);

export default function Thumbnail({ name, position, thumbnail }) {
  const classes = useStyles();

  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={6}>
        <div className={classes.profile}>
          <div>
            <img
              src={thumbnail?.path || basicThumbnail}
              // <div>Icons made by <a href="https://www.flaticon.com/authors/md-tanvirul-haque" title="Md Tanvirul Haque">Md Tanvirul Haque</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
              alt={thumbnail?.name}
              className={imageClasses}
            />
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
  name: PropTypes.string,
  position: PropTypes.string,
  thumbnail: PropTypes.object,
};
