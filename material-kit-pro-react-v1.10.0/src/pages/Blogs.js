import React, { Fragment } from "react";
import PropTypes from "prop-types";
import BaseParallax from "atoms/Parallax/BaseParallax";

import {
  container,
  title,
  main,
  whiteColor,
  mainRaised,
} from "assets/jss/material-kit-pro-react.js";
import { makeStyles } from "@material-ui/styles";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { CentralWhitePage } from "atoms/Container";
import PostList from "organisms/PostList";

export default function Blogs() {
  return (
    <Fragment>
      <BaseParallax small />
      <CentralWhitePage>
        <PostList />
      </CentralWhitePage>
    </Fragment>
  );
}
