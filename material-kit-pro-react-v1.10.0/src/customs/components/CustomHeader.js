import React from "react";
import { useQuery } from "@apollo/client";
import Header from "components/Header/Header";
import HeaderLinks from "components/Header/HeaderLinks";
import { HEADER } from "../../graphql";

export default function CustomHeader() {
  const { loading, error, data } = useQuery(HEADER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const {
    meta: { name },
    gnbs,
  } = data;

  return (
    <Header
      color="transparent"
      brand={name}
      links={<HeaderLinks dropdownHoverColor="info" gnbs={gnbs} />}
      fixed
      changeColorOnScroll={{
        height: 300,
        color: "info",
      }}
    />
  );
}
