import React from "react";
import PropTypes from "prop-types";

// molecules
import CareerClassList from "./CareerClassList";

// atoms
import { BasicStyledTitle } from "atoms/Title";
import { BasicStyledSection } from "atoms/Container";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

export default function Careers({ careersGroupedByClassification }) {
  return (
    <BasicStyledSection>
      <GridContainer justify="center">
        <GridItem xs={12} sm={8} md={8}>
          <BasicStyledTitle>이력</BasicStyledTitle>
          <CareerClassList
            careersGroupedByClassification={careersGroupedByClassification}
          />
        </GridItem>
      </GridContainer>
    </BasicStyledSection>
  );
}

Careers.propTypes = {
  careersGroupedByClassification: PropTypes.arrayOf(PropTypes.array).isRequired,
};
