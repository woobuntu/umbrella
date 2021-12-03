import { useQuery } from "@apollo/client";
import { isMobile } from "customs/utils";
import { IS_AUTHENTICATED } from "graphql/query";
import { isAuthenticatedVar } from "graphql/state";
import { useChannelTalk } from "hooks";
import React, { Fragment, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { CustomHeader, CustomFooter, PrivateRoute } from "./customs/components";
import {
  Home,
  SignIn,
  Mall,
  Product,
  WebBasket,
  MobileBasket,
  WebOrder,
  MobileOrder,
  Executive,
  Introduction,
  Document,
  MyPage,
  Success,
  Fail,
  SignUp,
} from "./pages";

export default function Layout() {
  useChannelTalk();
  const { loading, error, data } = useQuery(IS_AUTHENTICATED);

  useEffect(() => {
    if (data) {
      const {
        isAuthenticated: { isAuthenticated },
      } = data;
      isAuthenticatedVar(isAuthenticated);
    }
  }, [data]);

  if (loading) console.log("로딩중...");
  if (error) console.error(error);

  return (
    <Fragment>
      <CustomHeader />
      <Switch>
        <Route path="/profiles" component={Executive} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/mall/:id" component={Product} />
        <Route path="/mall" component={Mall} />
        <PrivateRoute path="/order">
          {isMobile() ? <MobileOrder /> : <WebOrder />}
        </PrivateRoute>
        <Route path="/introduction" component={Introduction} />
        <Route path="/document" component={Document} />
        <Route
          path="/basket"
          component={isMobile() ? MobileBasket : WebBasket}
        />
        <PrivateRoute path="/my-page">
          <MyPage />
        </PrivateRoute>
        <PrivateRoute path="/success">
          <Success />
        </PrivateRoute>
        <PrivateRoute path="/fail">
          <Fail />
        </PrivateRoute>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <CustomFooter />
    </Fragment>
  );
}
