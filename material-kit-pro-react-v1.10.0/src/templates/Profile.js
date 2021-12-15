import React, { Fragment } from "react";
import PropTypes from "prop-types";

// atoms
import { ProfileParallax } from "atoms/Parallax";
import { CentralWhitePage, BlackFontContainer } from "atoms/Container";

export default function Profile({ children }) {
  return (
    <Fragment>
      <ProfileParallax />
      <CentralWhitePage>
        <BlackFontContainer>{children}</BlackFontContainer>
      </CentralWhitePage>
    </Fragment>
  );
}

Profile.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
