import Parallax from "components/Parallax/Parallax";
import React, { Fragment } from "react";
import { historyStyle } from "customs/assets/styles";
import { makeStyles } from "@material-ui/styles";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { Typography } from "@material-ui/core";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import { useQuery } from "@apollo/client";
import { HISTORIES } from "graphql/query";
import EventNoteIcon from "@material-ui/icons/EventNote";
const useStyles = makeStyles(historyStyle);

export default function History() {
  const parallaxUrl =
    "https://woobuntu-umbrella.s3.ap-northeast-2.amazonaws.com/%E1%84%92%E1%85%A1%E1%86%B7%E1%84%81%E1%85%A6%E1%84%8A%E1%85%B3%E1%84%82%E1%85%B3%E1%86%AB%E1%84%8B%E1%85%AE%E1%84%89%E1%85%A1%E1%86%AB.jpeg";

  const { data } = useQuery(HISTORIES);

  const histories = data
    ? data.histories.filter((_, index) => index !== 0)
    : [];

  const classes = useStyles();
  return (
    <div>
      <Parallax image={parallaxUrl} filter="dark" small>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem md={8} className={classes.textCenter}>
              <h1 className={classes.title}>연혁</h1>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classes.main}>
        <div className={classes.container}>
          <GridContainer style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
            {histories.map(({ date, event }, index) => (
              <GridItem
                xs={12}
                sm={12}
                md={12}
                lg={12}
                key={index}
                style={{
                  marginBottom: "3rem",
                }}
              >
                <GridContainer justify="center">
                  <GridItem xs={5} sm={4} md={5} lg={5}>
                    <Typography
                      style={{
                        textAlign: "right",
                        fontFamily:
                          index % 2 == 0
                            ? "Nanum Gothic Coding"
                            : "textPrimary",
                        fontWeight: "bold",
                      }}
                      color={index % 2 == 0 ? "textSecondary" : "textPrimary"}
                    >
                      {index % 2 == 0 ? date : event}
                    </Typography>
                  </GridItem>
                  <GridItem
                    xs={1}
                    sm={1}
                    md={1}
                    lg={1}
                    style={{ textAlign: "center" }}
                  >
                    <EventNoteIcon />
                  </GridItem>
                  <GridItem xs={5} sm={5} md={5} lg={5}>
                    <Typography
                      style={{
                        textAlign: "left",
                        fontFamily:
                          index % 2 == 1
                            ? "Nanum Gothic Coding"
                            : "textPrimary",
                        fontWeight: "bold",
                      }}
                      color={index % 2 == 1 ? "textSecondary" : "textPrimary"}
                    >
                      {index % 2 == 1 ? date : event}
                    </Typography>
                  </GridItem>
                </GridContainer>
              </GridItem>
            ))}
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
