import React, { Fragment } from "react";
import PropTypes from "prop-types";

// atoms
import Button from "components/CustomButtons/Button.js";

export default function YesNoButtons({ onClickNoButton, onClickYesButton }) {
  return (
    <Fragment>
      <Button onClick={onClickNoButton} color="secondary">
        취소
      </Button>
      <Button onClick={onClickYesButton} color="primary">
        확인
      </Button>
    </Fragment>
  );
}

YesNoButtons.defaultProps = {
  onClickNoButton: () => {},
  onClickYesButton: () => {},
};

YesNoButtons.propTypes = {
  onClickNoButton: PropTypes.func,
  onClickYesButton: PropTypes.func,
};
