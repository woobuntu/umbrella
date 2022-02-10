import { CircularProgress } from "@material-ui/core";
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { useReactiveVar } from "@apollo/client";
import { isLoadingVar } from "graphql/state";

export default function Loading() {
  const isLoading = useReactiveVar(isLoadingVar);
  if (!isLoading) return <Fragment />;
  return (
    <div
      style={{
        position: "fixed",
        border: "1px solid black",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "gray",
        opacity: 0.7,
        zIndex: 1111,
      }}
    >
      <CircularProgress
        style={{ position: "fixed", top: "50%", left: "50%", zIndex: 1112 }}
      />
    </div>
  );
}
