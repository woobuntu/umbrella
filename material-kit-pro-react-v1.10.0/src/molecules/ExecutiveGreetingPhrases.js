import React from "react";
import PropTypes from "prop-types";

export default function ExecutiveGreetingPhrases({ greetings }) {
  return greetings.map((text, index) => <p key={index}>{text}</p>);
}

ExecutiveGreetingPhrases.defaultProps = {
  greetings: [],
};

ExecutiveGreetingPhrases.propTypes = {
  greetings: PropTypes.arrayOf(PropTypes.string),
};
