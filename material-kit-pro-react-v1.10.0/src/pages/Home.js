import React, { Fragment, useEffect } from "react";
import Parallax from "components/Parallax/Parallax";
import { homeStyle } from "../customs/assets/styles";
import { makeStyles } from "@material-ui/styles";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { SectionBusiness } from "customs/components";
import classNames from "classnames";

const useStyles = makeStyles(homeStyle);

export default function Home() {
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });

  const parallaxUrl =
    "https://woobuntu-umbrella.s3.ap-northeast-2.amazonaws.com/%E1%84%92%E1%85%A1%E1%86%B7%E1%84%81%E1%85%A6%E1%84%8A%E1%85%B3%E1%84%82%E1%85%B3%E1%86%AB%E1%84%8B%E1%85%AE%E1%84%89%E1%85%A1%E1%86%AB.jpg";
  return (
    <Fragment>
      <Parallax image={parallaxUrl} filter="dark">
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={6} md={6}>
              <h1 className={classes.title}>
                함께쓰는우산이 제2의 도약을 시작합니다
              </h1>
              <h4>
                사단법인 ‘함께쓰는우산’이 이제 제2의 도약을 시작합니다.
                ‘(사)함께쓰는우산’은 2016년 법인 설립 이후 지적장애인들의
                일자리창출 지원 및 복지서비스를 전달하는 한편, 지역사회와의
                소통을 위한 가교 역할을 해왔습니다. 그러나 ‘코로나19’의 영향으로
                지적장애인들의 복지문제와 재활, 일자리 문제 등은 사회적 관심의
                한 켠으로 밀려나간 느낌을 지울 수가 없습니다. 저는 어언 35년간
                대기업에서의 홍보 및 사회공헌(CSR) 활동의 경험을 바탕으로
                ‘(사)함께쓰는우산’이 우리 장애인들의 더 나은 삶의 질 개선을 위해
                제2의 도약을 함에 보탬이 되고자 합니다.
              </h4>
              <br />
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <SectionBusiness />
        </div>
      </div>
    </Fragment>
  );
}
