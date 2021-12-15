import React from "react";
import PropTypes from "prop-types";

// atoms
import Button from "components/CustomButtons/Button";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  floatRight: {
    width: "30%",
    float: "right!important",
  },
});

export default function FloatRightButton({ children, buttonProps }) {
  const classes = useStyles();

  return (
    <Button className={classes.floatRight} {...buttonProps}>
      {children}
    </Button>
  );
}

FloatRightButton.defaultProps = {
  children: "버튼",
  buttonProps: {
    onClick: () => {},
  },
};

FloatRightButton.propTypes = {
  // children: PropTypes.oneOfType([
  //   PropTypes.arrayOf(PropTypes.node),
  //   PropTypes.node,
  // ]).isRequired,
  children: PropTypes.string,
  // children으로 icon을 받는 경우도 있을 것 같은데 일단 string
  buttonProps: PropTypes.shape({
    onClick: PropTypes.func,
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "danger",
      "rose",
      "white",
      "twitter",
      "facebook",
      "google",
      "linkedin",
      "pinterest",
      "youtube",
      "tumblr",
      "github",
      "behance",
      "dribbble",
      "reddit",
      "instagram",
      "transparent",
    ]),
  }),
};
