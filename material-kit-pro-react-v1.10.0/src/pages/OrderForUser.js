import { useQuery } from "@apollo/client";
import { BASKETS } from "graphql/query";
import React from "react";
import Order from "./Order";

export default function OrderForUser() {
  const { loading, error, data } = useQuery(BASKETS);

  const tableHead = ["", "상품명", "옵션", "가격", "수량", "총금액"];

  // return <Order tableData={} />;
}
