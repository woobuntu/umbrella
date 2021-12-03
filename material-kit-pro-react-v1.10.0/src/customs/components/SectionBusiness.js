import React from "react";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { sectionBusinessStyle } from "customs/assets/styles";
import { makeStyles } from "@material-ui/styles";
import { LocalMall, Business, PhotoLibrary } from "@material-ui/icons";
import InfoArea from "components/InfoArea/InfoArea";
import { Link } from "react-router-dom";

const useStyles = makeStyles(sectionBusinessStyle);

export default function SectionBusiness() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={8} md={8}>
          <h2 className={classes.title}>
            안녕하십니까? ‘함께쓰는우산’과 뜻을 함께 해주시는 여러분!
          </h2>
          <h5 className={classes.description}>
            우리가 살아가는 지역사회에서 장애인이 비장애인과 함께 더불어 사는
            것은 지극히 당연한 일입니다. 그러기 위해서는 장애 관련 정책과 제도적
            뒷받침, 장애인의 원활한 일상생활을 지원하는 편의시설 등이 동반되어야
            할 것입니다. 장애인의 정당한 사회참여를 보장하는 이러한 환경은
            장애인 당사자의 노력만으로는 조성되기 어려울 것입니다. 따라서 우리
            ‘함께쓰는 우산’은 특히 힘든 환경에 처해 있는 지적장애인들이 당당하게
            자립하여 비장애인들과 지역사회에서 더불어 함께 살아갈 수 있도록
            미약하나마 가능한 역할을 다하고자 합니다. 여러분들의 성원과 격려
            그리고 작지만 소중한 나눔으로 이들에게 꿈과 희망을 주면서 오래도록
            함께 하고 싶습니다.
          </h5>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={4} md={4}>
          <Link to="/introduction/company">
            <InfoArea
              title="법인소개"
              icon={Business}
              description=""
              iconColor="primary"
              vertical
            />
          </Link>
        </GridItem>
        <GridItem xs={12} sm={4} md={4}>
          <InfoArea
            title="활동실적"
            icon={PhotoLibrary}
            iconColor="success"
            description=""
            vertical
          />
        </GridItem>
        <GridItem xs={12} sm={4} md={4}>
          <Link to="/mall">
            <InfoArea
              title="쇼핑몰"
              icon={LocalMall}
              iconColor="info"
              description=""
              vertical
            />
          </Link>
        </GridItem>
      </GridContainer>
    </div>
  );
}
