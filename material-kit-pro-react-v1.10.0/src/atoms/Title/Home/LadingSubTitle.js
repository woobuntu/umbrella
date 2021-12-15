import { isMobile } from "customs/utils";
import React from "react";
import Title from "../Title";

export default function LandingSubTitle() {
  const size = isMobile() ? 4 : 3;
  return (
    <Title size={size}>
      함께쓰는우산은 고객님의 소중한 나눔으로, 스스로의 노력만으로는 자립하기
      힘든 발달장애인들을 위한 일자리를 만듭니다
    </Title>
  );
}
