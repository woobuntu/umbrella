import { loadTossPayments } from "@tosspayments/sdk";
import useOrderer from "./useOrderer";
import { useState } from "react";
import useDelivery from "./useDelivery";
import { v4 } from "uuid";
import { makeOrderName } from "customs/utils";
import { setSessionItem } from "customs/utils/session-storage";
import { useQuery } from "@apollo/client";
import { PROFILE } from "graphql/query";

export default function useTossPayments({ basketData, totalPrice }) {
  const { data: profileData } = useQuery(PROFILE);
  const [submitted, setSubmitted] = useState(false);

  const ordererProps = useOrderer({ submitted, profileData });
  const deliveryProps = useDelivery({ submitted, profileData });

  const {
    customInputPropsForName: { state: ordererName },
    customInputPropsForEmail: { state: ordererEmail },
    phoneNumberProps: {
      customSelectPropsForFirstNumber: { state: ordererFirstNumber },
      customInputPropsForSecondNumber: { state: ordererSecondNumber },
      customInputPropsForThirdNumber: { state: ordererThirdNumber },
    },
  } = ordererProps;

  const {
    customInputPropsForName: { state: deliveryName },
    phoneNumberProps: {
      customSelectPropsForFirstNumber: { state: deliveryFirstNumber },
      customInputPropsForSecondNumber: { state: deliverySecondNumber },
      customInputPropsForThirdNumber: { state: deliveryThirdNumber },
    },
    addressProps: {
      customInputPropsForPostCode: { state: postCode },
      customInputPropsForAddress: { state: address },
      customInputPropsForDetailAddress: { state: detailAddress },
    },
    customInputPropsForMemo: { state: memo },
  } = deliveryProps;

  const orderer = {
    name: ordererName,
    email: ordererEmail,
    phone: ordererFirstNumber + ordererSecondNumber + ordererThirdNumber,
  };

  const delivery = {
    name: deliveryName,
    phone: deliveryFirstNumber + deliverySecondNumber + deliveryThirdNumber,
    postCode,
    address,
    detailAddress,
    memo,
  };

  const onPay = (method) => {
    if (ordererProps.isOrdererNotValid || deliveryProps.isDeliveryNotValid) {
      setSubmitted(true);
      alert("작성하지 않은 항목이 있습니다!");
      return;
    }
    loadTossPayments(process.env.REACT_APP_TOSS_CLIENT_ID).then(
      (tossPayments) => {
        let payload = {
          amount: totalPrice,
          orderId: v4(),
          orderName: makeOrderName(basketData),
          successUrl: `${window.location.origin}/success`,
          failUrl: `${window.location.origin}/fail`,
        };

        switch (method) {
          case "토스결제":
          case "카드":
            payload = {
              ...payload,
              customerName: orderer.name,
              customerEmail: orderer.email,
              customerMobilePhone: orderer.phone,
            };
            break;
          case "가상계좌":
            payload = {
              ...payload,
              customerEmail: orderer.email,
              customerMobilePhone: orderer.phoneNubmer,
              virtualAccountCallbackUrl: `${process.env.REACT_APP_API_URL}/toss/virtual-account-callback`,
            };
            break;
          case "계좌이체":
            payload = {
              ...payload,
              customerEmail: orderer.email,
              bank: "농협",
            };
            break;
        }
        tossPayments.requestPayment(method, payload);
        setSessionItem({
          key: "purchase",
          value: {
            orderer,
            delivery,
            payment: {
              platform: "토스",
              type: method,
            },
          },
        });
      }
    );
  };

  return {
    ordererProps,
    deliveryProps,
    onPay,
  };
}
