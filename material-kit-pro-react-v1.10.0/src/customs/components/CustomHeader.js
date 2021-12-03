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

  const isAuthenticated = useReactiveVar(isAuthenticatedVar);

  const [signOut, { client }] = useMutation(SIGN_OUT);

  let history = useHistory();

  const onSignOut = () =>
    signOut().then(() => {
      client.resetStore();
      history.push("/");
    });

  const isAuthLoading = useReactiveVar(isAuthLoadingVar);

  if (loading) console.log("로딩중...");
  if (error) alert(error.message);

  if (data)
    console.log(
      data.gnbs
        .filter(({ id }) => id !== 2)
        .map((gnb) => {
          const { id, lnbs } = gnb;
          if (id == 1) {
            return {
              ...gnb,
              lnbs: lnbs.filter((lnb) => {
                const { name } = lnb;
                return !(
                  name == "연혁" ||
                  name == "조직도" ||
                  name == "찾아오시는 길"
                );
              }),
            };
          }
          return gnb;
        })
    );

  const tempGnbs = data
    ? data.gnbs
        .filter(({ id }) => id !== 2)
        .map((gnb) => {
          const { id, lnbs } = gnb;
          if (id == 1) {
            return {
              ...gnb,
              lnbs: lnbs.filter((lnb) => {
                const { name } = lnb;
                return !(
                  name == "연혁" ||
                  name == "조직도" ||
                  name == "찾아오시는 길"
                );
              }),
            };
          }
          return gnb;
        })
    : [];

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
            isAuthenticated={isAuthenticated}
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
