import React from "react";
import PropTypes from "prop-types";

// molecules
import PaymentAmountInfo from "molecules/PaymentAmountInfo";

// atoms
import { Title } from "atoms/Title";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";
import TossSimplePaymentButton from "atoms/Buttons/TossSimplePaymentButton";
import CreditCardButton from "atoms/Buttons/CreditCardButton";
import VirtualAccountButton from "atoms/Buttons/VirtaulAccountButton";
import AccountTransferButton from "atoms/Buttons/AccountTransferButton";

// styles
import { makeStyles } from "@material-ui/styles";
import KakaoPayButton from "atoms/Buttons/KakaoPayButton";
const useStyles = makeStyles({
  verticallyAligned: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
  },
});

export default function PaymentInfoCard({
  paymentAmountInfoProps,
  paymentMethodsProps: {
    onClickCreditCardButton,
    onClickVirtualAccountButton,
    onClickAccountTransferButton,
    onClickTossSimplePaymentButton,
    onClickKakaoPayButton,
  },
}) {
  const classes = useStyles();
  return (
    <Card raised pricing color="primary">
      <CardBody>
        <Title size={4}>결제정보</Title>
        <PaymentAmountInfo {...paymentAmountInfoProps} />
      </CardBody>
      <CardFooter>
        <div className={classes.verticallyAligned}>
          <CreditCardButton onClick={onClickCreditCardButton} />
          {/* <VirtualAccountButton onClick={onClickVirtualAccountButton} /> */}
          <AccountTransferButton onClick={onClickAccountTransferButton} />
          <TossSimplePaymentButton onClick={onClickTossSimplePaymentButton} />
          <KakaoPayButton onClick={onClickKakaoPayButton} />
        </div>
      </CardFooter>
    </Card>
  );
}

PaymentInfoCard.defaultProps = {
  paymentMethodsProps: {
    onClickCreditCardButton: () => {},
    onClickVirtualAccountButton: () => {},
    onClickAccountTransferButton: () => {},
    onClickTossSimplePaymentButton: () => {},
    onClickKakaoPayButton: () => {},
  },
};

PaymentInfoCard.propTypes = {
  paymentMethodsProps: PropTypes.shape({
    onClickCreditCardButton: PropTypes.func,
    onClickVirtualAccountButton: PropTypes.func,
    onClickAccountTransferButton: PropTypes.func,
    onClickTossSimplePaymentButton: PropTypes.func,
    onClickKakaoPayButton: PropTypes.func,
  }),
  paymentAmountInfoProps: PropTypes.shape({
    basketTotalPrice: PropTypes.number,
    deliveryFee: PropTypes.number,
  }),
};
