import { useReactiveVar } from "@apollo/client";
import { isAuthenticatedVar } from "graphql/state";
import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

export default function PrivateRoute({ children, rest }) {
  let isAuthenticated = useReactiveVar(isAuthenticatedVar);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/sign-in",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  rest: PropTypes.object,
};
