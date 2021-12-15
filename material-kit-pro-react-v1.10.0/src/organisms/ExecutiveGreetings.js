import React from "react";
import PropTypes from "prop-types";

// atoms
import { BasicStyledTitle } from "atoms/Title";
import { Autograph } from "atoms/Image";
import { BasicStyledSection } from "atoms/Container";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

// molecules
import { ExecutiveGreetingPhrases } from "molecules";

export default function ExecutiveGreetings({ greetings, autographProps }) {
  return (
    <BasicStyledSection>
      <GridContainer justify="center">
        <GridItem xs={12} sm={8} md={8}>
          <BasicStyledTitle>드리는 말씀</BasicStyledTitle>
          <ExecutiveGreetingPhrases greetings={greetings} />
          <Autograph {...autographProps} />
        </GridItem>
      </GridContainer>
    </BasicStyledSection>
  );
}

ExecutiveGreetings.propTypes = {
  greetings: PropTypes.arrayOf(PropTypes.string),
  autographProps: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  }),
};
