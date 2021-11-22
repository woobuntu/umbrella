import { makeStyles } from "@material-ui/styles";
import Parallax from "components/Parallax/Parallax";
import { documentStyle } from "customs/assets/styles";
import React, { Fragment } from "react";
import { useLocation } from "react-router";
import { termsAndConditions } from "../documents";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

const useStyles = makeStyles(documentStyle);

export default function Document() {
  const { pathname } = useLocation();

  const subject = pathname.split("/")[2];

  const parallaxUrl =
    "https://woobuntu-umbrella.s3.ap-northeast-2.amazonaws.com/%E1%84%92%E1%85%A1%E1%86%B7%E1%84%81%E1%85%A6%E1%84%8A%E1%85%B3%E1%84%82%E1%85%B3%E1%86%AB%E1%84%8B%E1%85%AE%E1%84%89%E1%85%A1%E1%86%AB.jpg";

  let data;

  switch (subject) {
    case "guide":
      break;
    case "terms-and-conditions":
      data = termsAndConditions;
      break;
    case "privacy-policy":
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
                {data.map(({ title, contents }, index) => (
                  <ul key={index}>
                    <h3 className={classes.title}>{title}</h3>
                    {contents.map(({ type, text, contents }, index) => {
                      return (
                        <li
                          key={index}
                          style={{
                            listStyleType: switchListStyleType(type),
                            marginBottom: "2rem",
                          }}
                        >
                          <p style={{ marginBottom: 0 }}>{text}</p>
                          {contents && (
                            <ul>
                              {contents.map(({ type, text }, index) => (
                                <li
                                  key={index}
                                  style={{
                                    listStyleType: switchListStyleType(type),
                                    marginBottom: "0.5rem",
                                  }}
                                >
                                  {text}
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      );
                    })}
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
