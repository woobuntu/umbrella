import React from "react";
import PropTypes from "prop-types";

// atoms
import { List } from "@material-ui/core";
import { NestedListItem } from "atoms/ListItem";

export default function CareerList({ careers }) {
  return (
    <List>
      {careers.map(({ id, record }) => (
        <NestedListItem key={id}>{record}</NestedListItem>
      ))}
    </List>
  );
}

CareerList.defaultProps = {
  careers: [],
};

CareerList.propTypes = {
  careers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      record: PropTypes.string,
    })
  ).isRequired,
};
