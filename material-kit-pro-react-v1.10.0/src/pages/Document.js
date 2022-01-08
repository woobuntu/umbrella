import { makeStyles } from "@material-ui/styles";
import Parallax from "components/Parallax/Parallax";
import { documentStyle } from "customs/assets/styles";
import React, { Fragment } from "react";
import { useLocation } from "react-router";
import { termsAndConditions, privacyPolicy, guide } from "../documents";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

const useStyles = makeStyles(documentStyle);

export default function Document() {
  const { pathname } = useLocation();

  const subject = pathname.split("/")[2];

  const parallaxUrl =
    "https://woobuntu-umbrella.s3.ap-northeast-2.amazonaws.com/%E1%84%92%E1%85%A1%E1%86%B7%E1%84%81%E1%85%A6%E1%84%8A%E1%85%B3%E1%84%82%E1%85%B3%E1%86%AB%E1%84%8B%E1%85%AE%E1%84%89%E1%85%A1%E1%86%AB.jpeg";

  let data;

  switch (subject) {
    case "guide":
      data = guide;
      break;
    case "terms-and-conditions":
      data = termsAndConditions;
      break;
    case "privacy-policy":
      data = privacyPolicy;
      break;
  }

  const classes = useStyles();

  const switchListStyleType = (type) => {
    let listStyleType = "";

    switch (type) {
      case "depth1":
        listStyleType = "decimal";
        break;
      case "depth2":
        listStyleType = "hangul-consonant";
        break;
      case "depth3":
        listStyleType = "circle";
        break;
      case "depth4":
        listStyleType = "square";
        break;
      case "comment":
        listStyleType = "disclosure-closed";
        break;
      default:
        listStyleType = "none";
        break;
    }

    return listStyleType;
  };

  let parallaxTitle = "";

  switch (subject) {
    case "guide":
      parallaxTitle = "이용안내";
      break;
    case "terms-and-conditions":
      parallaxTitle = "이용약관";
      break;
    case "privacy-policy":
      parallaxTitle = "개인정보처리방침";
      break;
  }

  return (
    <Fragment>
      <Parallax image={parallaxUrl} filter="dark">
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem md={8} className={classes.textCenter}>
              <h1 className={classes.parallaxTitle}>{parallaxTitle}</h1>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classes.main}>
        <div className={classes.container}>
          <div className={classes.section}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={10} md={10} className={classes.section}>
                {subject == "privacy-policy" && (
                  <p>{`<함께쓰는우산장애인보호작업장>('https://withus1030.co.kr'이하 '함께쓰는우산')은(는) 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.`}</p>
                )}
                {subject == "privacy-policy" && (
                  <p>{`○ 이 개인정보처리방침은 2021년 12월 1부터 적용됩니다.`}</p>
                )}
                {data.map(({ title, contents }, index) => (
                  <ul key={index}>
                    <h3 className={classes.title}>{title}</h3>
                    {(function recursion(contents) {
                      return contents.map(
                        ({ type, text, contents: innerContents }, index) => (
                          <li
                            key={index}
                            style={{
                              listStyleType: switchListStyleType(type),
                              marginBottom: "2rem",
                            }}
                          >
                            <p style={{ marginBottom: 0 }}>{text}</p>
                            {innerContents && (
                              <ul>{recursion(innerContents)}</ul>
                            )}
                          </li>
                        )
                      );
                    })(contents)}
                  </ul>
                ))}
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
