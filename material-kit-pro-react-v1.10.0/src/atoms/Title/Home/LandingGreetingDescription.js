import { makeStyles } from "@material-ui/styles";
import React from "react";
import Title from "../Title";
import { grayColor } from "assets/jss/material-kit-pro-react.js";

const useStyles = makeStyles({
  description: {
    color: grayColor[0],
  },
});

export default function LandingGreetingDescription() {
  const classes = useStyles();
  return (
    <Title size={5} className={classes.description}>
      우리가 살아가는 지역사회에서 장애인이 비장애인과 함께 더불어 사는 것은
      지극히 당연한 일입니다. 그러기 위해서는 장애 관련 정책과 제도적 뒷받침,
      장애인의 원활한 일상생활을 지원하는 편의시설 등이 동반되어야 할 것입니다.
      장애인의 정당한 사회참여를 보장하는 이러한 환경은 장애인 당사자의
      노력만으로는 조성되기 어려울 것입니다. 따라서 우리 ‘함께쓰는 우산’은 특히
      힘든 환경에 처해 있는 지적장애인들이 당당하게 자립하여 비장애인들과
      지역사회에서 더불어 함께 살아갈 수 있도록 미약하나마 가능한 역할을
      다하고자 합니다. 여러분들의 성원과 격려 그리고 작지만 소중한 나눔으로
      이들에게 꿈과 희망을 주면서 오래도록 함께 하고 싶습니다.
    </Title>
  );
}
