import React from "react";
import {
  Dialog,
  DialogTitle,
  Slide,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import style from "../../../assets/jss/material-kit-pro-react/modalStyle";
import { makeStyles } from "@material-ui/core/styles";
import Close from "@material-ui/icons/Close";
import { useReactiveVar } from "@apollo/client";
import { isModalOpenVar } from "graphql/state";

const useStyles = makeStyles(style);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Modal({ onCancel, onOk, children }) {
  const classes = useStyles();
  const isModalOpen = useReactiveVar(isModalOpenVar);
  const onClose = () => isModalOpenVar(false);

  return (
    <Dialog
      open={isModalOpen}
      classes={{ root: classes.modalRoot, paper: classes.modal }}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-labelledby="classic-modal-slide-title"
      aria-describedby="classic-modal-slide-description"
    >
      <DialogTitle
        id="classic-modal-slide-title"
        disableTypography
        className={classes.modalHeader}
      >
        <Button
          simple
          className={classes.modalCloseButton}
          key="close"
          aria-label="Close"
          onClick={onClose}
        >
          <Close className={classes.modalClose} />
        </Button>
      </DialogTitle>
      <DialogContent
        id="classic-modal-slide-description"
        className={classes.modalBody}
      >
        {children}
      </DialogContent>
      <DialogActions className={classes.modalFooter}>
        <Button onClick={onCancel(onClose)} color="secondary">
          취소
        </Button>
        <Link to="/basket">
          <Button color="primary" onClick={onOk(onClose)}>
            확인
          </Button>
        </Link>
      </DialogActions>
    </Dialog>
  );
}
Modal.defaultProps = {
  onOk: (onClose) => () => onClose(),
  onCancel: (onClose) => () => onClose(),
};

Modal.propTypes = {
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
