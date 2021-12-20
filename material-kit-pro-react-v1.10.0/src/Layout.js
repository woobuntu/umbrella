import { useQuery } from "@apollo/client";
import { isMobile } from "customs/utils";
import { IS_AUTHENTICATED } from "graphql/query";
import { isAuthenticatedVar } from "graphql/state";
import { useChannelTalk } from "hooks";
import Admin from "pages/Admin";
import MobileBasket from "pages/MobileBasket";
import WebBasket from "pages/WebBasket";
import React, { Fragment, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { CustomHeader, CustomFooter, PrivateRoute } from "./customs/components";
import {
  Home,
  SignIn,
  Mall,
  Product,
  Executive,
  Introduction,
  Document,
  MyPage,
  Fail,
  History,
  PurchaseDetail,
  WebOrder,
  MobileOrder,
  TossSuccess,
  KakaoSuccess,
} from "./pages";

export default function Layout() {
  useChannelTalk();
  const { error, data } = useQuery(IS_AUTHENTICATED);

  useEffect(() => {
    if (data) {
      const {
        isAuthenticated: { isAuthenticated },
      } = data;
      isAuthenticatedVar(isAuthenticated);
    }
  }, [data]);

  if (error) alert(error.message);

  return (
    <Fragment>
      <CustomHeader />
      <Switch>
        <Route path="/executives/:id" component={Executive} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/mall/:id" component={Product} />
        <Route path="/mall" component={Mall} />
        <Route path="/history" component={History} />
        {/* temp */}
        <Route path="/order" component={isMobile() ? MobileOrder : WebOrder} />
        {/* <PrivateRoute path="/order">
          {isMobile() ? <MobileOrder /> : <WebOrder />}
        </PrivateRoute> */}
        <Route path="/introduction" component={Introduction} />
        <Route path="/document" component={Document} />
        <Route
          path="/basket"
          component={isMobile() ? MobileBasket : WebBasket}
        />
        {/* <Route
          path="/basket"
          component={isMobile() ? MobileBasket : WebBasket}
        /> */}
        <PrivateRoute path="/purchase/:id">
          <PurchaseDetail />
        </PrivateRoute>
        <PrivateRoute path="/my-page">
          <MyPage />
        </PrivateRoute>
        <PrivateRoute path="/toss-success">
          <TossSuccess />
        </PrivateRoute>
        <PrivateRoute path="/kakao-success">
          <KakaoSuccess />
        </PrivateRoute>
        <PrivateRoute path="/fail">
          <Fail />
        </PrivateRoute>
        <PrivateRoute path="/admin">
          <Admin />
        </PrivateRoute>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <CustomFooter />
    </Fragment>
  );
}
