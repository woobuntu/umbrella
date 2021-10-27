/*!

=========================================================
* Material Kit PRO React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import "assets/scss/material-kit-pro-react.scss?v=1.10.0";
import Layout from "./Layout";
import { client } from "./graphql";

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Layout />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
