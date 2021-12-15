import React from "react";
import PropTypes from "prop-types";

// size, text를 받아 제목을 반환
export default function Title({ size, children, className }) {
  switch (size) {
    case 1:
      return <h1 className={className}>{children}</h1>;
    case 2:
      return <h2 className={className}>{children}</h2>;
    case 3:
      return <h3 className={className}>{children}</h3>;
    case 4:
      return <h4 className={className}>{children}</h4>;
    case 5:
      return <h5 className={className}>{children}</h5>;
    case 6:
      return <h6 className={className}>{children}</h6>;
  }
}

Title.defaultProps = {
  size: 1,
  children: "",
};

Title.propTypes = {
  size: PropTypes.number.isRequired,
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
};
