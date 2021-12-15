import React from "react";

// atoms
import { WhiteFontContainer } from "atoms/Container";
import { LandingTitle, LandingSubTitle } from "atoms/Title/Home";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

export default function LandingPhrases() {
  return (
    <WhiteFontContainer>
      <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
          <LandingTitle />
          <LandingSubTitle />
        </GridItem>
      </GridContainer>
    </WhiteFontContainer>
  );
}
