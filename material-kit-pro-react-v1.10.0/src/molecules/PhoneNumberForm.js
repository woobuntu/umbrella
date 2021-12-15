import React from "react";
import PropTypes from "prop-types";

// atoms
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { CustomSelect } from "atoms/Form";
import CustomInput from "components/CustomInput/CustomInput";

export default function PhoneNumberForm({
  customSelectPropsForFirstNumber,
  customInputPropsForSecondNumber,
  customInputPropsForThirdNumber,
  disabled,
}) {
  return (
    <GridContainer direction="row" alignItems="center">
      <GridItem xs>
        <CustomSelect
          options={["010", "011", "016", "017", "019"]}
          selectProps={{
            value: customSelectPropsForFirstNumber.value,
            onChange: customSelectPropsForFirstNumber.onChange,
            inputProps: {
              disabled,
            },
          }}
        />
      </GridItem>
      <GridItem xs>
        <CustomInput
          labelText="(X)XXX"
          inputProps={{
            id: "second-number",
            name: "secondNumber",
            autoComplete: "tel-local-prefix",
            disabled,
            ...customInputPropsForSecondNumber.inputProps,
          }}
          error={customInputPropsForSecondNumber.error}
        />
      </GridItem>
      <GridItem xs>
        <CustomInput
          labelText="XXXX"
          inputProps={{
            id: "third-number",
            name: "thirdNumber",
            autoComplete: "tel-local-suffix",
            disabled,
            ...customInputPropsForThirdNumber.inputProps,
          }}
          error={customInputPropsForThirdNumber.error}
        />
      </GridItem>
    </GridContainer>
  );
}

PhoneNumberForm.defaultProps = {
  customSelectPropsForFirstNumber: {
    value: "010",
  },
  customInputPropsForSecondNumber: {
    error: false,
  },
  customInputPropsForThirdNumber: {
    error: false,
  },
  disabled: false,
};

PhoneNumberForm.propTypes = {
  customSelectPropsForFirstNumber: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func,
  }),
  customInputPropsForSecondNumber: PropTypes.shape({
    inputProps: PropTypes.shape({
      value: PropTypes.string,
      onChange: PropTypes.func,
    }),
    error: PropTypes.bool,
  }),
  customInputPropsForThirdNumber: PropTypes.shape({
    inputProps: PropTypes.shape({
      value: PropTypes.string,
      onChange: PropTypes.func,
    }),
    error: PropTypes.bool,
  }),
  disabled: PropTypes.bool,
};
