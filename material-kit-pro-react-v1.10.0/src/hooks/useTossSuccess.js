import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import { useMutation } from "@apollo/client";
import { CREATE_PAYMENT_BY_TOSS } from "graphql/mutation";

export default function useTossSuccess({
  receiverInfoSetters,
  paymentResultSetters,
}) {
  const { search } = useLocation();
  const [createPaymentByToss] = useMutation(CREATE_PAYMENT_BY_TOSS);
  const history = useHistory();
  useEffect(() => {
    if (search) {
      const { amount, orderId, paymentKey } = queryString.parse(search);

      createPaymentByToss({
        variables: {
          tossPaymentsInput: {
            amount: Number(amount),
            orderId,
            paymentKey,
          },
        },
      })
        .then(
          ({
            data: {
              createPaymentByToss: {
                amount,
                deliveryFee,
                delivery: {
                  name,
                  phone,
                  postCode,
                  address,
                  detailAddress,
                  memo,
                },
              },
            },
            errors,
          }) => {
            if (errors) {
              alert(errors);
            }
            receiverInfoSetters.setName(name);
            receiverInfoSetters.setPostCode(postCode);
            receiverInfoSetters.setAddress(address);
            receiverInfoSetters.setDetailAddress(detailAddress);
            receiverInfoSetters.setMemo(memo);
            paymentResultSetters.setDeliveryFee(deliveryFee);
            paymentResultSetters.setBasketTotalPrice(amount - deliveryFee);
          }
        )
        .catch((error) => {
          if (error.message == "Forbidden resource") {
            history.push("/");
          } else {
            alert(error);
          }
        });
    }
  }, [search]);
}
