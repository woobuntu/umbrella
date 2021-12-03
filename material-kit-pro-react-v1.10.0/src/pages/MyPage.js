import React from "react";
import Profile from "./Profile";
import { Thumbnail } from "customs/components/profile";
import { mypageStyle } from "customs/assets/styles";
import { makeStyles } from "@material-ui/core/styles";
import { loadTossPayments } from "@tosspayments/sdk";
import { v4 } from "uuid";
import { useProfile } from "hooks";
import { BasicOrderer } from "customs/components/mypage";
import { BasicDelivery } from "customs/components/mypage";
import { useQuery } from "@apollo/client";
import { PROFILE } from "graphql/query";

const useStyles = makeStyles(mypageStyle);

export default function MyPage() {
  const classes = useStyles();

  const { loading, error, data: profileData } = useQuery(PROFILE);

  const enrollCard = () =>
    loadTossPayments(process.env.REACT_APP_TOSS_CLIENT_ID).then(
      (tossPayments) => {
        tossPayments.requestBillingAuth("카드", {
          customerKey: v4(),
          successUrl: `${window.location.origin}/success`,
          failUrl: `${window.location.origin}/fail`,
        });
      }
    );

  return (
    <Profile>
      <Thumbnail />
      <BasicOrderer profileData={profileData} />
      <BasicDelivery profileData={profileData} />

      {/* 배송지 정보 */}
      {/* 결제수단 등록 */}
      {/* 주문내역 */}
    </Profile>
  );
}
