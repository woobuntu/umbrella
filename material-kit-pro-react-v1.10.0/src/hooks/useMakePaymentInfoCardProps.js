import { useMutation } from "@apollo/client";
import { PREPARE_KAKAOPAY } from "graphql/mutation";
import { makeOrderName } from "utils";
import { requestTossPayments } from "utils";
import getIsMobile from "utils/getIsMobile";
import { v4 } from "uuid";
import useStoreOrdererAndDeliveryInSession from "./useStoreOrdererAndDeliveryInSession";

export default function useMakePaymentInfoCardProps({
  products,
  ordererInfo,
  deliveryInfo,
  validateForm,
}) {
  const basketTotalPrice = products.reduce(
    (sum, { productTotalPrice }) => sum + productTotalPrice,
    0
  );
  const deliveryFee = basketTotalPrice > 30000 ? 0 : 3000;
  const tossCommonPayload = {
    amount: basketTotalPrice + deliveryFee,
    orderId: v4(),
    orderName: makeOrderName(products),
    successUrl: `${window.location.origin}/toss-success`,
    failUrl: `${window.location.origin}/fail`,
  };
  const customerName = ordererInfo.name;
  const customerEmail = ordererInfo.email;
  const customerMobilePhone = ordererInfo.phone.split("-").join("");
  const virtualAccountCallbackUrl = `${process.env.REACT_APP_API_URL}/toss/virtual-account-callback`;

  const [prepareKakaoPay] = useMutation(PREPARE_KAKAOPAY);

  const storeOrdererAndDeliveryInSession = useStoreOrdererAndDeliveryInSession({
    ordererInfo,
    deliveryInfo,
  });

  // 토스 결제창 열기 전에 우리 서버로 요청 먼저 보내서
  // db가 아닌 session에 order, delivery, payment 정보 저장해두면 되네용...?
  const paymentMethodsProps = {
    onClickCreditCardButton: () =>
      validateForm() &&
      storeOrdererAndDeliveryInSession().then(() =>
        requestTossPayments({
          method: "카드",
          payload: {
            ...tossCommonPayload,
            customerName,
            customerEmail,
            customerMobilePhone,
          },
        })
      ),
    onClickVirtualAccountButton: () =>
      validateForm() &&
      storeOrdererAndDeliveryInSession().then(() =>
        requestTossPayments({
          method: "가상계좌",
          payload: {
            ...tossCommonPayload,
            customerEmail,
            customerMobilePhone,
            virtualAccountCallbackUrl,
          },
        })
      ),
    onClickAccountTransferButton: () =>
      validateForm() &&
      storeOrdererAndDeliveryInSession().then(() =>
        requestTossPayments({
          method: "계좌이체",
          payload: {
            ...tossCommonPayload,
            customerEmail,
          },
        })
      ),
    onClickTossSimplePaymentButton: () =>
      validateForm() &&
      storeOrdererAndDeliveryInSession().then(() =>
        requestTossPayments({
          method: "토스결제",
          payload: {
            ...tossCommonPayload,
            customerName,
            customerEmail,
            customerMobilePhone,
          },
        })
      ),
    onClickKakaoPayButton: () =>
      validateForm() &&
      storeOrdererAndDeliveryInSession().then(() =>
        prepareKakaoPay()
          .then(
            ({
              data: {
                prepareKakaoPayment: { webRedirectUrl, mobileRedirectUrl },
              },
            }) => {
              const isMobile = getIsMobile();
              if (isMobile) {
                window.location.href = mobileRedirectUrl;
              } else {
                window.location.href = webRedirectUrl;
              }
            }
          )
          .catch((error) => {
            // refreshToken 재발급에 신청했을 때 재로그인을 요청하기 위한 임시 방편
            if (error.message === "Request failed with status code 401") {
              window.location.reload();
            }
          })
      ),
  };

  const paymentAmountInfoProps = {
    basketTotalPrice,
    deliveryFee,
  };
  return { paymentMethodsProps, paymentAmountInfoProps };
}
