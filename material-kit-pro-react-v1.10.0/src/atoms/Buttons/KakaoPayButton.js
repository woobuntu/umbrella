import React from "react";
import PropTypes from "prop-types";

// atoms
import Button from "components/CustomButtons/Button";

// styles
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles({
  kakao: {
    backgroundColor: "#FEE500",
    color: "black",
    fontWeight: "bold",
  },
});

export default function KakaoPayButton({ onClick }) {
  const classes = useStyles();

  return (
    <Button round className={classes.kakao} onClick={onClick}>
      카카오페이
    </Button>
  );
}

KakaoPayButton.propTypes = {
  onClick: PropTypes.func,
};
