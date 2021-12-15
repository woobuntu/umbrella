import React from "react";
import Title from "./Title";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import { title } from "assets/jss/material-kit-pro-react.js";

const useStyles = makeStyles({
  title: {
    ...title,
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
  },
});

export default function UserName({ children }) {
  const classes = useStyles();

  return (
    <Title size={3} className={classes.title}>
      {children}
    </Title>
  );
}

UserName.defaultProps = {
  children: "이름",
};

UserName.propTypes = {
  children: PropTypes.string,
};
