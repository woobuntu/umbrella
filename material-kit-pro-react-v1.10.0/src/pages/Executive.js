import React from "react";
import Profile from "./Profile";
import { Thumbnail, Greeting, Career } from "customs/components/profile";
import { useQuery } from "@apollo/client";
import { EXECUTIVE } from "graphql/query";
import { useLocation } from "react-router";

export default function Executive() {
  let { pathname } = useLocation();

  const executiveId = pathname.split("/")[2] === "representative" ? 2 : 1;

  const { loading, error, data } = useQuery(EXECUTIVE, {
    variables: {
      executiveId,
    },
  });

  if (loading) console.log("로딩중...");
  if (error) alert(error.message);

  const name = data?.executive.name;
  const position = data?.executive.position;
  const convertedCareers = data
    ? Object.entries(
        data.executive.careers?.reduce((hash, career) => {
          const { classification } = career;
          if (hash.hasOwnProperty(classification)) {
            hash[classification].push(career);
          } else {
            hash[classification] = [career];
          }
          return hash;
        }, {})
      )
    : [];

  const thumbnail = data
    ? data.executive.executiveFileRelations.filter(({ file: { name } }) =>
        name.includes("thumbnail")
      )[0].file
    : {};

  const autograph = data
    ? data.executive.executiveFileRelations.filter(({ file: { name } }) =>
        name.includes("autograph")
      )[0].file
    : {};

  const greetings = data ? data.executive.greeting.split("\n") : [];

  return (
    <Profile>
      <Thumbnail name={name} position={position} thumbnail={thumbnail} />
      <Greeting greetings={greetings} autograph={autograph} />
      <Career careers={convertedCareers} />
    </Profile>
  );
}
