import React from "react";

// atoms
import {
  LandingGreetingTitle,
  LandingGreetingDescription,
} from "atoms/Title/Home";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

export default function LandingGreetingPhrases() {
  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={8} md={8}>
        <LandingGreetingTitle />
        <LandingGreetingDescription />
      </GridItem>
    </GridContainer>
  );
}
