import React from "react";
import PropTypes from "prop-types";

// atoms
import Button from "components/CustomButtons/Button";

// styles
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles({
  whiteAndRound: {
    backgroundColor: "white",
    color: "black",
    fontWeight: "bold",
  },
});

export default function WhiteRoundButton({ children, onClick }) {
  const classes = useStyles();
  return (
    <Button
      color="white"
      round
      onClick={onClick}
      className={classes.whiteAndRound}
    >
      {children}
    </Button>
  );
}

WhiteRoundButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
