import { makeStyles } from "@material-ui/styles";
import { CentralWhitePage } from "atoms/Container";
import BaseParallax from "atoms/Parallax/BaseParallax";
import { Title } from "atoms/Title";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import React, { Fragment } from "react";

import {
  container,
  title,
  whiteColor,
  main,
  mainRaised,
} from "assets/jss/material-kit-pro-react.js";
import ContainerWithZindex1 from "atoms/Container/ContainerWithZindex1";

const useStyles = makeStyles({
  container: {
    ...container,
    zIndex: "2",
  },
  textCenter: {
    textAlign: "center",
  },
  title: {
    ...title,
    color: whiteColor,
  },
});

export default function Organization() {
  const classes = useStyles();
  return (
    <Fragment>
      <BaseParallax small>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem md={8} className={classes.textCenter}>
              <Title size={1} className={classes.title}>
                조직도
              </Title>
            </GridItem>
          </GridContainer>
        </div>
      </BaseParallax>
      <CentralWhitePage>
        <ContainerWithZindex1>
          <img
            style={{ width: "100%", marginTop: "3rem" }}
            src={`https://woobuntu-umbrella.s3.ap-northeast-2.amazonaws.com/%E1%84%8C%E1%85%A9%E1%84%8C%E1%85%B5%E1%86%A8%E1%84%83%E1%85%A9.png`}
          />
          <p>
            <a
              href="https://www.flaticon.com/free-icons/businessman"
              title="businessman icons"
            >
              Businessman icons created by kmg design - Flaticon
            </a>
          </p>
          <p>
            <a
              href="https://www.flaticon.com/free-icons/error"
              title="error icons"
            >
              Error icons created by Smashicons - Flaticon
            </a>
          </p>
          <p>
            <a
              href="https://www.flaticon.com/free-icons/team"
              title="team icons"
            >
              Team icons created by Freepik - Flaticon
            </a>
          </p>
          <p>
            <a
              href="https://www.flaticon.com/free-icons/director"
              title="director icons"
            >
              Director icons created by Eucalyp - Flaticon
            </a>
          </p>
          <p>
            <a
              href="https://www.flaticon.com/free-icons/finance"
              title="finance icons"
            >
              Finance icons created by Freepik - Flaticon
            </a>
          </p>
          <p>
            <a
              href="https://www.flaticon.com/free-icons/teacher"
              title="teacher icons"
            >
              Teacher icons created by geotatah - Flaticon
            </a>
          </p>
          <p>
            <a
              href="https://www.flaticon.com/free-icons/volunteer"
              title="volunteer icons"
            >
              Volunteer icons created by Eucalyp - Flaticon
            </a>
          </p>
          <p>
            <a
              href="https://www.flaticon.com/free-icons/cooperation"
              title="Cooperation icons"
            >
              Cooperation icons created by nawicon - Flaticon
            </a>
          </p>
        </ContainerWithZindex1>
      </CentralWhitePage>
    </Fragment>
  );
}
