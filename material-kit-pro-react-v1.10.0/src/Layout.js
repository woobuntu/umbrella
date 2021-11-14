import { useQuery } from "@apollo/client";
import { IS_AUTHENTICATED } from "graphql/query";
import { isAuthenticatedVar } from "graphql/state";
import { useChannelTalk } from "hooks";
import React, { Fragment, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { CustomHeader, CustomFooter } from "./customs/components";
import {
  Home,
  SignIn,
  Mall,
  ProductForNonUser,
  ProductForUser,
  BasketForNonUser,
  BasketForUser,
  OrderForNonUser,
} from "./pages";

export default function Layout() {
  useChannelTalk();
  const { loading, error, data, refetch } = useQuery(IS_AUTHENTICATED);

  useEffect(() => {
    if (data) {
      const {
        isAuthenticated: { isAuthenticated },
      } = data;
      isAuthenticatedVar(isAuthenticated);
    }
  }, [data]);

  if (loading) return <div>로딩중...</div>;
  if (error) console.error(error);

  const {
    isAuthenticated: { isAuthenticated },
  } = data;

  return (
    <Fragment>
      <CustomHeader />
      <Switch>
        <Route path="/sign-in">
          <SignIn />
        </Route>
        <Route path="/mall/:id">
          {isAuthenticated ? <ProductForUser /> : <ProductForNonUser />}
        </Route>
        <Route path="/mall">
          <Mall />
        </Route>
        <Route path="/basket">
          {isAuthenticated ? <BasketForUser /> : <BasketForNonUser />}
        </Route>
        <Route path="/order">
          <OrderForNonUser />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <CustomFooter />
    </Fragment>
  );
}
