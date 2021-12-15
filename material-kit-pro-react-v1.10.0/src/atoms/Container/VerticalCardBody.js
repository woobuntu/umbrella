import React from "react";
import PropTypes from "prop-types";
import CardBody from "components/Card/CardBody";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  vertical: {
    display: "flex",
    flexDirection: "column",
  },
});

export default function VerticalCardBody({ children }) {
  const classes = useStyles();

  return <CardBody className={classes.vertical}>{children}</CardBody>;
}

VerticalCardBody.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
