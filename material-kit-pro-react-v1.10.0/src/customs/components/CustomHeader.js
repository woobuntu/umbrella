import React from "react";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import Header from "components/Header/Header";
import HeaderLinks from "components/Header/HeaderLinks";
import { SIGN_OUT } from "../../graphql/mutation";
import { HEADER } from "../../graphql/query";
import { isAuthenticatedVar, isAuthLoadingVar } from "graphql/state";
import { useHistory } from "react-router";

export default function CustomHeader() {
  const { loading, error, data } = useQuery(HEADER);

  const role = useReactiveVar(isAuthenticatedVar);

  const [signOut, { client }] = useMutation(SIGN_OUT);

  let history = useHistory();

  const onSignOut = () =>
    signOut().then(() => {
      client.resetStore();
      history.push("/");
    });

  const isAuthLoading = useReactiveVar(isAuthLoadingVar);

  if (error) alert(error.message);

  const tempGnbs = !data
    ? []
    : data.gnbs.map((gnb) => {
        const { id, lnbs } = gnb;
        if (id == 1) {
          return {
            ...gnb,
            lnbs: lnbs.filter(
              ({ name }) =>
                !(
                  name == "설립자 인사말" ||
                  name == "연혁" ||
                  name == "조직도" ||
                  name == "찾아오시는 길"
                )
            ),
          };
        } else {
          return gnb;
        }
      });

  return (
    <Header
      color="transparent"
      brand={data && data.meta.name}
      links={
        data && (
          <HeaderLinks
            dropdownHoverColor="info"
            gnbs={tempGnbs}
            isAuthLoading={isAuthLoading}
            role={role}
            onSignOut={onSignOut}
          />
        )
      }
      fixed
      changeColorOnScroll={{
        height: 300,
        color: "info",
      }}
    />
  );
}
