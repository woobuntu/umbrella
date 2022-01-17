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

  if (error) alert(error.message);

  return (
    <Header
      color="transparent"
      brand={data && data.meta.name}
      links={
        data && (
          <HeaderLinks
            dropdownHoverColor="info"
            gnbs={data ? data.gnbs : []}
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
