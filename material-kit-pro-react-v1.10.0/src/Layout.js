import { useQuery } from "@apollo/client";
import { isMobile } from "customs/utils";
import { IS_AUTHENTICATED } from "graphql/query";
import { isAuthenticatedVar } from "graphql/state";
import { useChannelTalk } from "hooks";
import React, { Fragment, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import {
  CustomHeader,
  CustomFooter,
  PrivateRoute,
  AdminRoute,
} from "./customs/components";
import Admin from "pages/Admin";
import MobileBasket from "pages/MobileBasket";
import WebBasket from "pages/WebBasket";
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
  Blogs,
  BlogRead,
  BlogWrite,
} from "./pages";

export default function Layout() {
  useChannelTalk();
  const { error, data } = useQuery(IS_AUTHENTICATED);

  useEffect(() => {
    if (data) {
      const {
        isAuthenticated: { role },
      } = data;
      isAuthenticatedVar(role);
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

        <Route path="/introduction" component={Introduction} />
        <Route path="/document" component={Document} />
        <Route
          path="/basket"
          component={isMobile() ? MobileBasket : WebBasket}
        />
        <AdminRoute path="/performances/new">
          <BlogWrite />
        </AdminRoute>
        <AdminRoute path="/performances/edit/:id">
          <BlogWrite />
        </AdminRoute>
        <Route path="/performances/:id" component={BlogRead} />
        <Route path="/performances" component={Blogs} />
        <AdminRoute path="/notifications/new">
          <BlogWrite />
        </AdminRoute>
        <AdminRoute path="/notifications/edit/:id">
          <BlogWrite />
        </AdminRoute>
        <Route path="/notifications/:id" component={BlogRead} />
        <Route path="/notifications" component={Blogs} />
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
        <AdminRoute path="/admin">
          <Admin />
        </AdminRoute>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <CustomFooter />
    </Fragment>
  );
}
