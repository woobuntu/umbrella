import React from "react";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import CustomSelect from "./CustomSelect";
import CustomInput from "components/CustomInput/CustomInput";
import PropTypes from "prop-types";

export default function PhoneNumber({ state, actions }) {
  const { first, second, third } = state;
  const { setFirstNumber, setSecondNumber, setThirdNumber } = actions;

  return (
    <GridContainer direction="row" alignItems="center">
      <GridItem xs>
        <CustomSelect
          options={["010", "011", "016", "017", "019"]}
          state={first}
          action={setFirstNumber}
        />
      </GridItem>
      <GridItem xs>
        <CustomInput state={second} action={setSecondNumber} />
      </GridItem>
      <GridItem xs>
        <CustomInput state={third} action={setThirdNumber} />
      </GridItem>
    </GridContainer>
  );
}

PhoneNumber.propTypes = {
  state: PropTypes.object,
  actions: PropTypes.objectOf(PropTypes.func),
};
