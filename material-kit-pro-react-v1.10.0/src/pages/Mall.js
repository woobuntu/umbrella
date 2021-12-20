import Parallax from "components/Parallax/Parallax";
import React, { useEffect } from "react";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

import { mallStyle } from "customs/assets/styles";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import { SectionCatalogs } from "customs/components";
import InfoArea from "components/InfoArea/InfoArea";
import { Eco } from "@material-ui/icons";
import { FaHands } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
const useStyles = makeStyles(mallStyle);

export default function Mall() {
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });

  const parallaxUrl =
    "https://woobuntu-umbrella.s3.ap-northeast-2.amazonaws.com/%E1%84%91%E1%85%A9%E1%84%8C%E1%85%A1%E1%86%BC%E1%84%87%E1%85%A1%E1%86%A8%E1%84%89%E1%85%B3.jpg";

  const featureImageUrl =
    "https://woobuntu-umbrella.s3.ap-northeast-2.amazonaws.com/%E1%84%8C%E1%85%A1%E1%86%A8%E1%84%8B%E1%85%A5%E1%86%B82.jpg";
  return (
    <div>
      <Parallax image={parallaxUrl} filter="dark" small>
        <div className={classes.container}>
          <GridContainer>
            <GridItem
              md={8}
              sm={8}
              className={classNames(
                classes.mlAuto,
                classes.mrAuto,
                classes.textCenter
              )}
            >
              <div className={classes.brand}>
                <h1 className={classes.title}>쇼핑몰</h1>
                <h4>
                  가치소비는 나눔과 동행입니다. 착한 소비는 흐뭇하고 뿌듯합니다.
                </h4>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <div className={classes.features}>
            <GridContainer>
              <GridItem
                xs={12}
                sm={6}
                md={6}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div className={classes.phoneContainer}>
                  <img
                    src={featureImageUrl}
                    alt="..."
                    style={{
                      borderRadius: "1rem",
                    }}
                  />
                </div>
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
                <h2 className={classes.title}>
                  고객님께 드리는 함께쓰는우산의 약속
                </h2>
                <InfoArea
                  className={classes.infoArea}
                  icon={Eco}
                  title="양질의 고급 재료만을 사용합니다"
                  description="방부제는 일체 사용하지 않습니다"
                  iconColor="success"
                />
                <InfoArea
                  className={classes.infoArea}
                  icon={FaHands}
                  title="모든 제조과정은 정성을 가득 담은 전통적 수작업입니다"
                  description="소중한 우리 가족과 이웃을 아끼는 마음으로 정성껏 만듭니다"
                  iconColor="warning"
                />
                <InfoArea
                  className={classes.infoArea}
                  icon={GiReceiveMoney}
                  title="모든 수익금은 발달장애인의 일자리 지원사업에 사용됩니다"
                  description=""
                  iconColor="info"
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
        <SectionCatalogs />
      </div>
    </div>
  );
}
