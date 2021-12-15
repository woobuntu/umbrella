import React, { Fragment } from "react";
import PropTypes from "prop-types";
import BaseParallax from "atoms/Parallax/BaseParallax";
import { CentralWhitePage } from "atoms/Container";
import ContainerWithZindex1 from "atoms/Container/ContainerWithZindex1";
import UpDownPaddingSection from "atoms/Container/UpDownPaddingSection";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import ReceiverInfoCard from "organisms/ReceiverInfoCard";
import { makeStyles } from "@material-ui/styles";

import { mlAuto, mrAuto } from "assets/jss/material-kit-pro-react.js";
import PaymentResultCard from "organisms/PaymentResultCard";

const useStyles = makeStyles({
  mlAuto,
  mrAuto,
});

export default function Success({
  receiverInfoCardProps,
  paymentResultCardProps,
}) {
  const classes = useStyles();

  return (
    <Fragment>
      <BaseParallax filter="dark" small />
      <CentralWhitePage>
        <ContainerWithZindex1>
          <UpDownPaddingSection>
            <GridContainer>
              <GridItem xs={12} sm={4} md={4} className={classes.mlAuto}>
                <ReceiverInfoCard {...receiverInfoCardProps} />
              </GridItem>
              <GridItem xs={12} sm={4} md={4} className={classes.mrAuto}>
                <PaymentResultCard {...paymentResultCardProps} />
              </GridItem>
            </GridContainer>
          </UpDownPaddingSection>
        </ContainerWithZindex1>
      </CentralWhitePage>
    </Fragment>
  );
}

Success.propTypes = {
  receiverInfoCardProps: PropTypes.shape({
    name: PropTypes.string,
    postCode: PropTypes.string,
    address: PropTypes.string,
    detailAddress: PropTypes.string,
    memo: PropTypes.string,
  }),
  paymentResultCardProps: PropTypes.shape({
    basketTotalPrice: PropTypes.number,
    deliveryFee: PropTypes.number,
  }),
};
