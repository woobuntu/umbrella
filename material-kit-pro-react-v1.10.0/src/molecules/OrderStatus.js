import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Stepper, Step, StepLabel } from "@material-ui/core";
import getIsMobile from "utils/getIsMobile";
import Button from "components/CustomButtons/Button";
import FlexEnd from "atoms/Container/FlexEnd";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useMutation } from "@apollo/client";
import { UPDATE_ORDER_STATUS } from "graphql/mutation";
import { PROFILE } from "graphql/query";
import { PAYMENTS } from "graphql/query";
import { ArrowBack, ArrowForward, ArrowRight } from "@material-ui/icons";
const useStyles = makeStyles({
  root: {
    // display: "flex",
    // justifyContent: "space-between",
    width: "100%",
  },
  node: {
    "&:hover": {
      cursor: "pointer",
    },
  },
});

export default function OrderStatus({
  onChangeStatus,
  paymentId,
  orderStatus,
}) {
  const classes = useStyles();
  const steps = [
    // "결제대기",
    "결제완료",
    "상품준비중",
    "배송시작",
    "배송중",
    "배송완료",
  ];

  const activeStep = steps.indexOf(orderStatus);

  const { pathname } = useLocation();

  return getIsMobile() && pathname == "/my-page" ? (
    <FlexEnd>
      <Button color="instagram">{orderStatus}</Button>
    </FlexEnd>
  ) : (
    <div className={classes.root}>
      <Stepper
        activeStep={activeStep}
        orientation={getIsMobile() ? "vertical" : "horizontal"}
      >
        {steps.map((label) => (
          <Step
            key={label}
            onClick={() =>
              pathname === "/admin" &&
              onChangeStatus({
                orderStatus: label,
                paymentId,
              })
            }
          >
            <StepLabel className={classes.node}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

// OrderStatus.defaultProps = {};

OrderStatus.propTypes = {
  onChangeStatus: PropTypes.func,
  paymentId: PropTypes.number,
  orderStatus: PropTypes.arrayOf([
    "결제대기",
    "결제완료",
    "상품준비중",
    "배송시작",
    "배송중",
    "배송완료",
  ]),
};
