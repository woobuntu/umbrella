import React from "react";

// templates
import Profile from "../templates/Profile";

// organisms
import { ExecutiveGreetings } from "organisms";

// molecules
import { UserBasicInfo } from "molecules";
import { Careers } from "molecules/Careers/index";

// hooks
import { useExecutive } from "hooks/executive";

export default function Executive() {
  const {
    userBasicInfoProps,
    executiveGreetingsProps,
    careersGroupedByClassification,
  } = useExecutive();
  return (
    <Profile>
      <UserBasicInfo {...userBasicInfoProps} />
      <ExecutiveGreetings {...executiveGreetingsProps} />
      <Careers
        careersGroupedByClassification={careersGroupedByClassification}
      />
    </Profile>
  );
}
