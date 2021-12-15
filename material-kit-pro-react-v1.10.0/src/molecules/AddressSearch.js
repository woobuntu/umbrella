import React from "react";
import PropTypes from "prop-types";

// hooks
import { useAddressSearch } from "hooks";

// styles
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles({
  container: {
    border: "1px solid",
    margin: "1rem 0",
    position: "relative",
  },
  closeButton: {
    cursor: "pointer",
    position: "absolute",
    right: "0px",
    top: "-1px",
    zIndex: 1,
  },
});

export default function AddressSearch({ onClose, onConfirm }) {
  const classes = useStyles();

  const containerRef = useAddressSearch({ onClose, onConfirm });

  return (
    <div className={classes.container} ref={containerRef}>
      <img
        className={classes.closeButton}
        src="//t1.daumcdn.net/postcode/resource/images/close.png"
        id="btnFoldWrap"
        onClick={onClose}
        alt="접기 버튼"
      />
    </div>
  );
}

AddressSearch.defaultProps = {
  onClose: () => {},
  onConfirm: () => {},
};

AddressSearch.propTypes = {
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
};
