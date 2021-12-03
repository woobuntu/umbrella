import { useQuery, useReactiveVar } from "@apollo/client";
import { isAuthenticatedVar } from "graphql/state";
import React, { useEffect } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { IS_AUTHENTICATED } from "graphql/query";

export default function PrivateRoute({ children, rest }) {
  const history = useHistory();
  const { loading, error, data } = useQuery(IS_AUTHENTICATED);

  if (loading) return <div>잠시만 기다려주십시오...</div>;

  return data.isAuthenticated.isAuthenticated ? (
    <Route {...rest}>{children}</Route>
  ) : (
    <Redirect to="/sign-in" />
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  rest: PropTypes.object,
};
