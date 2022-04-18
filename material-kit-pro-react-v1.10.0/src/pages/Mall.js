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
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import ReceiptIcon from "@material-ui/icons/Receipt";
import ViewCompactIcon from "@material-ui/icons/ViewCompact";
import RedeemIcon from "@material-ui/icons/Redeem";
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
                <h3 className={classes.title} style={{ marginBottom: 0 }}>
                  장애인 연계고용제도를 활용할 수 있는 사업장입니다.
                </h3>
                <h4 className={classes.title} style={{ marginTop: 0 }}>
                  (고용분담금 50% 감면혜택)
                </h4>
                <InfoArea
                  className={classes.infoArea}
                  icon={CardGiftcardIcon}
                  title="거래처, 사내직원, 명절, 기념일 선물용으로 좋습니다."
                  description=""
                  iconColor="success"
                />
                <InfoArea
                  className={classes.infoArea}
                  icon={ReceiptIcon}
                  title="요청시 기부영수증을 발행해 드립니다."
                  description=""
                  iconColor="warning"
                />
                <InfoArea
                  className={classes.infoArea}
                  icon={ViewCompactIcon}
                  title="선물은 고객의 주문에 따라 가격별로 구성을 다양하게 할 수 있습니다."
                  description="031-342-1030(유선문의)"
                  iconColor="info"
                />
                <InfoArea
                  className={classes.infoArea}
                  icon={RedeemIcon}
                  title="선물상자는 수급사정에 따라 변경될 수 있습니다."
                  description=""
                  iconColor="rose"
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
