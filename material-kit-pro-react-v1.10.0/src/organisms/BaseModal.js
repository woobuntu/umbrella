import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Slide,
} from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";
import { Close } from "@material-ui/icons";
import { Title } from "atoms/Title";

import { grayColor, whiteColor } from "assets/jss/material-kit-pro-react.js";

const useStyles = makeStyles((theme) => ({
  modalRoot: {
    overflow: "auto",
    display: "block",
  },
  modal: {
    [theme.breakpoints.up("sm")]: {
      maxWidth: "500px",
      margin: "auto",
      marginTop: "130px !important",
    },
    borderRadius: "6px",
    overflow: "visible",
    maxHeight: "unset",
    width: "100%",
  },
  modalHeader: {
    borderBottom: "none",
    paddingTop: "24px",
    paddingRight: "24px",
    paddingBottom: "0",
    paddingLeft: "24px",
    minHeight: "16.43px",
  },
  modalCloseButton: {
    "&, &:hover": {
      color: grayColor[0],
    },
    "&:hover": {
      opacity: "1",
    },
    cursor: "pointer",
    padding: "1rem",
    margin: "-1rem -1rem -1rem auto",
    backgroundColor: "transparent",
    border: "0",
    WebkitAppearance: "none",
    float: "right",
    fontSize: "1.5rem",
    fontWeight: "500",
    lineHeight: "1",
    textShadow: "0 1px 0 " + whiteColor,
    opacity: ".5",
  },
  modalClose: {
    width: "16px",
    height: "16px",
  },
  modalTitle: {
    margin: "0",
    lineHeight: "1.5",
  },
  modalBody: {
    paddingTop: "24px",
    paddingRight: "24px",
    paddingBottom: "16px",
    paddingLeft: "24px",
    position: "relative",
    overflow: "visible",
  },
  modalFooter: {
    padding: "15px",
    textAlign: "right",
    paddingTop: "0",
    margin: "0",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function BaseModal({
  modalTitle,
  open,
  onClose,
  content,
  buttons,
}) {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
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
        <Title size={4} className={classes.modalTitle}>
          {modalTitle}
        </Title>
      </DialogTitle>
      <DialogContent
        id="classic-modal-slide-description"
        className={classes.modalBody}
      >
        {content}
      </DialogContent>
      <DialogActions className={classes.modalFooter}>{buttons}</DialogActions>
    </Dialog>
  );
}

BaseModal.propTypes = {
  modalTitle: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  content: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  buttons: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
