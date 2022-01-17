import React, { Fragment, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import BaseParallax from "atoms/Parallax/BaseParallax";
import { CentralWhitePage } from "atoms/Container";
import { makeStyles } from "@material-ui/styles";
import { useQuill } from "react-quilljs";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import {
  grayColor,
  title,
  mlAuto,
  mrAuto,
} from "assets/jss/material-kit-pro-react.js";

import "quill/dist/quill.bubble.css"; // Add css for bubble theme

const useStyles = makeStyles({
  title,
  section: {
    backgroundPosition: "50%",
    backgroundSize: "cover",
    padding: "70px 5%",
    "& p": {
      fontSize: "1.188rem",
      lineHeight: "1.5em",
      color: grayColor[15],
      marginBottom: "30px",
    },
  },
  mlAuto,
  mrAuto,
});

export default function Blog() {
  const classes = useStyles();
  const theme = "bubble";
  const { quill, quillRef, Quill } = useQuill({
    theme,
    modules: { magicUrl: true },
  });

  if (Quill && !quill) {
    const MagicUrl = require("quill-magic-url").default;
    Quill.register("modules/magicUrl", MagicUrl);
  }

  return (
    <Fragment>
      <BaseParallax small />
      <CentralWhitePage>
        <div className={classes.section}>
          <div ref={quillRef} />
        </div>
      </CentralWhitePage>
    </Fragment>
  );
}
