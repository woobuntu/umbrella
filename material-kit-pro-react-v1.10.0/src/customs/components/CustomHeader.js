import React from "react";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import Header from "components/Header/Header";
import HeaderLinks from "components/Header/HeaderLinks";
import { HEADER, isAuthenticatedVar, SIGN_OUT } from "../../graphql";

export default function CustomHeader() {
  const {
    loading: headerLoading,
    error: headerError,
    data: headerData,
  } = useQuery(HEADER);
  const [
    signOut,
    { loading: signOutLoading, error: signOutError, data: signOutData },
  ] = useMutation(SIGN_OUT);

  const onSignOut = () => {
    signOut().then(
      ({
        data: {
          signOut: { isAuthenticated },
        },
      }) => {
        isAuthenticatedVar(isAuthenticated);
      }
    );
  };

  const isAuthenticated = useReactiveVar(isAuthenticatedVar);

  if (headerLoading || signOutLoading) return <p>Loading...</p>;
  if (headerError) alert(headerError.message);
  if (signOutError) alert(headerError.message);

  const {
    meta: { name },
    gnbs,
  } = headerData;

  return (
    <Header
      color="transparent"
      brand={name}
      links={
        <HeaderLinks
          dropdownHoverColor="info"
          gnbs={gnbs}
          isAuthenticated={isAuthenticated}
          onSignOut={onSignOut}
        />
      }
      fixed
      changeColorOnScroll={{
        height: 300,
        color: "info",
      }}
    />
  );
}
