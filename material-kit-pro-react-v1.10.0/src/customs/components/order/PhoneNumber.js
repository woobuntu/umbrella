import React from "react";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import CustomSelect from "./CustomSelect";
import CustomInput from "components/CustomInput/CustomInput";
import PropTypes from "prop-types";

export default function PhoneNumber({
  customSelectPropsForFirstNumber,
  customInputPropsForSecondNumber,
  customInputPropsForThirdNumber,
}) {
  return (
    <GridContainer direction="row" alignItems="center">
      <GridItem xs>
        <CustomSelect {...customSelectPropsForFirstNumber} />
      </GridItem>
      <GridItem xs>
        <CustomInput {...customInputPropsForSecondNumber} />
      </GridItem>
      <GridItem xs>
        <CustomInput {...customInputPropsForThirdNumber} />
      </GridItem>
    </GridContainer>
  );
}

PhoneNumber.propTypes = {
  customSelectPropsForFirstNumber: PropTypes.object,
  customInputPropsForSecondNumber: PropTypes.object,
  customInputPropsForThirdNumber: PropTypes.object,
};
