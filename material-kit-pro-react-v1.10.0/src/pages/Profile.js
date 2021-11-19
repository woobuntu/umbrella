import React, { Fragment } from "react";
import Parallax from "components/Parallax/Parallax";
import { profileStyle } from "customs/assets/styles";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import { Thumbnail, Greeting, Career } from "customs/components/profile";
import { useQuery } from "@apollo/client";
import { EXECUTIVE } from "graphql/query";
import { useLocation } from "react-router";

const useStyles = makeStyles(profileStyle);

export default function Profile() {
  const parallaxUrl =
    "https://woobuntu-umbrella.s3.ap-northeast-2.amazonaws.com/%E1%84%92%E1%85%A1%E1%86%B7%E1%84%81%E1%85%A6%E1%84%8A%E1%85%B3%E1%84%82%E1%85%B3%E1%86%AB%E1%84%8B%E1%85%AE%E1%84%89%E1%85%A1%E1%86%AB.jpg";

  const classes = useStyles();

  let { pathname } = useLocation();

  const executiveId = pathname.split("/")[2] === "representative" ? 2 : 1;

  const { loading, error, data } = useQuery(EXECUTIVE, {
    variables: {
      executiveId,
    },
  });

  if (loading) return <div>로딩중...</div>;
  if (error) alert(error.message);

  const {
    executive: { name, position, greeting, executiveFileRelations, careers },
  } = data;

  const convertedCareers = Object.entries(
    careers.reduce((hash, career) => {
      const { classification } = career;
      if (hash.hasOwnProperty(classification)) {
        hash[classification].push(career);
      } else {
        hash[classification] = [career];
      }
      return hash;
    }, {})
  );

  const executive = {
    name,
    position,
    thumbnail: executiveFileRelations.filter(({ file: { name } }) =>
      name.includes("thumbnail")
    )[0].file,
  };

  const autograph = executiveFileRelations.filter(({ file: { name } }) =>
    name.includes("autograph")
  )[0].file;

  return (
    <Fragment>
      <Parallax
        image={parallaxUrl}
        filter="dark"
        className={classes.parallax}
      />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <Thumbnail executive={executive} />
          <Greeting greetings={greeting.split("\n")} autograph={autograph} />
          <Career careers={convertedCareers} />
        </div>
      </div>
    </Fragment>
  );
}
