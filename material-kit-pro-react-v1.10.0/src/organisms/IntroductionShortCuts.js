import React from "react";

// molecules
import { InfoAreaLinked } from "molecules/InfoArea";

// atoms
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

// icons
import { LocalMall, Business, PhotoLibrary } from "@material-ui/icons";

export default function IntroductionShortCuts() {
  return (
    <GridContainer>
      <GridItem xs={12} sm={4} md={4}>
        <InfoAreaLinked
          path="/introduction/company"
          title="법인소개"
          icon={Business}
          description=""
          iconColor="primary"
          vertical
        />
      </GridItem>
      <GridItem xs={12} sm={4} md={4}>
        <InfoAreaLinked
          // path=""
          title="활동실적"
          icon={PhotoLibrary}
          iconColor="success"
          description=""
          vertical
        />
      </GridItem>
      <GridItem xs={12} sm={4} md={4}>
        <InfoAreaLinked
          path="/mall"
          title="쇼핑몰"
          icon={LocalMall}
          iconColor="info"
          description=""
          vertical
        />
      </GridItem>
    </GridContainer>
  );
}
