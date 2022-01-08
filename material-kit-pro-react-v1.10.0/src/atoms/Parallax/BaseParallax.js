import Parallax from "components/Parallax/Parallax";
import React from "react";
import PropTypes from "prop-types";

// parallax styling을 먹인 div이므로 atom
export default function BaseParallax({
  image,
  children,
  className,
  style,
  small,
}) {
  return (
    <Parallax
      image={image}
      className={className}
      filter="dark"
      small={small}
      style={style}
    >
      {children}
    </Parallax>
  );
}
const umbrella =
  "https://woobuntu-umbrella.s3.ap-northeast-2.amazonaws.com/%E1%84%92%E1%85%A1%E1%86%B7%E1%84%81%E1%85%A6%E1%84%8A%E1%85%B3%E1%84%82%E1%85%B3%E1%86%AB%E1%84%8B%E1%85%AE%E1%84%89%E1%85%A1%E1%86%AB.jpeg";

BaseParallax.defaultProps = {
  image: umbrella,
};

BaseParallax.propTypes = {
  image: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.string, // style은 안쓰는게 좋긴 한데
  small: PropTypes.bool,
};
