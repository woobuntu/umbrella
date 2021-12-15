import React, { Fragment } from "react";
import Profile from "../templates/Profile";
import { mypageStyle } from "customs/assets/styles";
import { makeStyles } from "@material-ui/core/styles";
import { loadTossPayments } from "@tosspayments/sdk";
import { v4 } from "uuid";
import NavPills from "components/NavPills/NavPills";
import { RiFileUserLine } from "react-icons/ri";
import { ListAlt, Payment } from "@material-ui/icons";
import { UserBasicInfo } from "molecules";
import { UserInfoFormCard } from "organisms";
import { DefaultDeliveryFormCard } from "organisms";
import useUserQuery from "hooks/useUserQuery";
import PurchaseHistory from "organisms/PurchaseHistory";

const useStyles = makeStyles(mypageStyle);

export default function MyPage() {
  const classes = useStyles();

  const { userInfo, defaultDeliveryInfo, payments } = useUserQuery();
  // const enrollCard = () =>
  //   loadTossPayments(process.env.REACT_APP_TOSS_CLIENT_ID).then(
  //     (tossPayments) => {
  //       tossPayments.requestBillingAuth("카드", {
  //         customerKey: v4(),
  //         successUrl: `${window.location.origin}/success`,
  //         failUrl: `${window.location.origin}/fail`,
  //       });
  //     }
  //   );

  return (
    <Profile>
      <UserBasicInfo />
      <NavPills
        alignCenter
        color="primary"
        tabs={[
          {
            tabButton: "회원정보",
            tabIcon: RiFileUserLine,
            tabContent: (
              <Fragment>
                <UserInfoFormCard userInfoFromServer={userInfo} />
                <DefaultDeliveryFormCard
                  defaultDeliveryInfoFromServer={defaultDeliveryInfo}
                />
              </Fragment>
            ),
          },
          {
            tabButton: "주문내역",
            tabIcon: ListAlt,
            tabContent: (
              <Fragment>
                {payments.map((payment) => (
                  <PurchaseHistory
                    key={payment.id}
                    payment={payment}
                    // purchases={payment.purchases}
                  />
                ))}
              </Fragment>
            ),
          },
          // {
          //   tabButton: "결제수단등록",
          //   tabIcon: Payment,
          //   tabContent: <div>결제수단등록!</div>,
          // },
        ]}
      />
    </Profile>
  );
}
