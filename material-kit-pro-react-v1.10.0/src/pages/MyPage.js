import React, { Fragment, useState } from "react";
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
import CancelOrderModal from "organisms/CancelOrderModal";
import { useMutation } from "@apollo/client";
import { CANCEL_ORDER } from "graphql/mutation";
import { PROFILE } from "graphql/query";

const useStyles = makeStyles(mypageStyle);

export default function MyPage() {
  const classes = useStyles();

  const { userInfo, defaultDeliveryInfo, payments } = useUserQuery();

  const [detailPurchaseId, setDetailPurchaseId] = useState(null);

  const paymentsToBeShown = detailPurchaseId
    ? payments.filter(({ id }) => id == detailPurchaseId)
    : payments;

  const [paymentIdToBeDeleted, setPaymentIdToBeDeleted] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (paymentId) => {
    setPaymentIdToBeDeleted(paymentId);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelOrder] = useMutation(CANCEL_ORDER);
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
                {paymentsToBeShown.map((payment) => (
                  <PurchaseHistory
                    key={payment.id}
                    payment={payment}
                    setDetailPurchaseId={setDetailPurchaseId}
                    onClickOrderCancelButton={openModal}
                  />
                ))}
                <CancelOrderModal
                  open={isModalOpen}
                  onClose={closeModal}
                  inputProps={{
                    value: cancelReason,
                    onChange: (e) => setCancelReason(e.target.value),
                    error: cancelReason ? false : true,
                  }}
                  yesNoButtonsProps={{
                    onClickYesButton: () =>
                      cancelOrder({
                        variables: {
                          cancelOrderInput: {
                            cancelReason,
                            paymentId: paymentIdToBeDeleted,
                          },
                        },
                        refetchQueries: [PROFILE],
                      }).then(closeModal),
                    onClickNoButton: closeModal,
                  }}
                />
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
