import React from "react";
import BaseModal from "../common/BaseModal";
import PropTypes from "prop-types";

export default function ImageModal({ content }) {
  return <BaseModal content={content} />;
}

ImageModal.propTypes = {
  content: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
