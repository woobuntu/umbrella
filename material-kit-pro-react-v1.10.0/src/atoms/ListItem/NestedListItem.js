import React from "react";
import PropTypes from "prop-types";
import { ListItem, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function NestedListItem({ children }) {
  const classes = useStyles();

  return <ListItem className={classes.nested}>{children}</ListItem>;
}

NestedListItem.propTypes = {
  children: PropTypes.string.isRequired,
  // string? node?
};
