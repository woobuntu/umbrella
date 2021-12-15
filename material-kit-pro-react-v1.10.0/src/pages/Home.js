import React, { Fragment } from "react";

// organisms
import {
  LandingPhrases,
  LandingGreetingPhrases,
  IntroductionShortCuts,
} from "organisms";

// atoms
import { UmbrellaParallax } from "atoms/Parallax";
import { CentralWhitePage, BlackFontContainer } from "atoms/Container";
import { LandingSection } from "atoms/Container/Home";

// hook
import { useScrollTop, useSignIn } from "hooks";

export default function Home() {
  useScrollTop();
  useSignIn();
  return (
    <Fragment>
      <UmbrellaParallax>
        <LandingPhrases />
      </UmbrellaParallax>
      <CentralWhitePage>
        <BlackFontContainer>
          <LandingSection>
            <LandingGreetingPhrases />
            <IntroductionShortCuts />
          </LandingSection>
        </BlackFontContainer>
      </CentralWhitePage>
    </Fragment>
  );
}
