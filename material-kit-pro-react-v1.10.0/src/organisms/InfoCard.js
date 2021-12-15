import React from "react";
import PropTypes from "prop-types";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";

export default function InfoCard({ cardColor, bodyContent }) {
  return (
    <Card raised pricing color={cardColor}>
      <CardBody pricing>{bodyContent}</CardBody>
    </Card>
  );
}

InfoCard.propTypes = {
  cardColor: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose",
  ]),
  bodyContent: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
