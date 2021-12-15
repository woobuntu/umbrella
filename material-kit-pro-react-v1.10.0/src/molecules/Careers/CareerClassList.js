import React, { Fragment } from "react";
import PropTypes from "prop-types";

// atoms
import { List, ListItem } from "@material-ui/core";

// molecules
import CareerList from "./CareerList";

export default function CareerClassList({ careersGroupedByClassification }) {
  return (
    <List>
      {careersGroupedByClassification.map(([classification, careers]) => (
        <Fragment key={classification}>
          <ListItem>{classification}</ListItem>
          <CareerList careers={careers} />
        </Fragment>
      ))}
    </List>
  );
}

CareerClassList.defaultProps = {
  careersGroupedByClassification: [],
};

CareerClassList.propTypes = {
  careersGroupedByClassification: PropTypes.arrayOf(
    PropTypes.shape([
      PropTypes.string,
      PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          record: PropTypes.string,
        })
      ),
    ])
  ).isRequired,
};
