import React, { Fragment } from "react";
import Parallax from "components/Parallax/Parallax";
import { profileStyle } from "customs/assets/styles";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import PropTypes from "prop-types";

const useStyles = makeStyles(profileStyle);

export default function Profile({ children }) {
  const parallaxUrl =
    "https://woobuntu-umbrella.s3.ap-northeast-2.amazonaws.com/%E1%84%92%E1%85%A1%E1%86%B7%E1%84%81%E1%85%A6%E1%84%8A%E1%85%B3%E1%84%82%E1%85%B3%E1%86%AB%E1%84%8B%E1%85%AE%E1%84%89%E1%85%A1%E1%86%AB.jpg";

  const classes = useStyles();

  return (
    <Fragment>
      <Parallax
        image={parallaxUrl}
        filter="dark"
        className={classes.parallax}
      />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>{children}</div>
      </div>
    </Fragment>
  );
}

Profile.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
