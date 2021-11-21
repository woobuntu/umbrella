import Parallax from "components/Parallax/Parallax";
import React, { Fragment } from "react";
import { introductionStyle } from "customs/assets/styles";
import { makeStyles } from "@material-ui/styles";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { useQuery } from "@apollo/client";
import { META_FILE_RELATIONS } from "graphql/query";
import { useLocation } from "react-router";
import classNames from "classnames";

const useStyles = makeStyles(introductionStyle);

export default function Introduction() {
  const parallaxUrl =
    "https://woobuntu-umbrella.s3.ap-northeast-2.amazonaws.com/%E1%84%92%E1%85%A1%E1%86%B7%E1%84%81%E1%85%A6%E1%84%8A%E1%85%B3%E1%84%82%E1%85%B3%E1%86%AB%E1%84%8B%E1%85%AE%E1%84%89%E1%85%A1%E1%86%AB.jpg";

  const classes = useStyles();

  const imgClasses = classNames(
    classes.imgRaised,
    classes.imgRounded,
    classes.imgFluid
  );

  const { pathname } = useLocation();

  const type = pathname.split("/")[2];
  const { loading, error, data } = useQuery(META_FILE_RELATIONS, {
    variables: {
      type,
    },
  });

  if (loading) return <div>로딩중...</div>;
  if (error) alert(error.message);

  const images = data.metaFileRelations.map(({ file }) => file);

  const dividedImages = [];
  while (images.length) {
    dividedImages.push(images.splice(0, 3));
  }

  return (
    <Fragment>
      <Parallax image={parallaxUrl} filter="dark" />
      <div className={classes.main}>
        <div className={classes.container}>
          <div className={classes.section}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={10} md={10} className={classes.section}>
                {dividedImages.map((threeImages, index) => (
                  <GridContainer key={index} style={{ marginBottom: "2rem" }}>
                    {threeImages.map(({ id, name, path }) => (
                      <GridItem xs={12} sm={4} md={4} key={id}>
                        <img src={path} alt={name} className={imgClasses} />
                      </GridItem>
                    ))}
                  </GridContainer>
                ))}
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
