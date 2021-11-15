import React from "react";
import ImageGallery from "react-image-gallery";
import PropTypes from "prop-types";

export default function ProductImages({ items }) {
  return (
    <ImageGallery
      showFullscreenButton={false}
      showPlayButton={false}
      startIndex={0}
      items={items}
      showThumbnails={true}
      renderLeftNav={(onClick, disabled) => {
        return (
          <button
            className="image-gallery-left-nav"
            disabled={disabled}
            onClick={onClick}
          />
        );
      }}
      renderRightNav={(onClick, disabled) => {
        return (
          <button
            className="image-gallery-right-nav"
            disabled={disabled}
            onClick={onClick}
          />
        );
      }}
    />
  );
}

ProductImages.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      original: PropTypes.string,
      thumbnail: PropTypes.string,
    })
  ),
};
