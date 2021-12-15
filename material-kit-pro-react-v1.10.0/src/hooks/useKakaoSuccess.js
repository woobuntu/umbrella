import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useMutation } from "@apollo/client";
import { CREATE_PAYMENT_BY_KAKAO } from "graphql/mutation";
import { useHistory } from "react-router-dom";

export default function useKakaoSuccess({
  receiverInfoSetters,
  paymentResultSetters,
}) {
  const { search } = useLocation();

  const history = useHistory();

  const [createPaymentByKakao] = useMutation(CREATE_PAYMENT_BY_KAKAO);
  useEffect(() => {
    if (search) {
      const { pg_token } = queryString.parse(search);
      createPaymentByKakao({
        variables: {
          pgToken: pg_token,
        },
      })
        .then(
          ({
            data: {
              createPaymentByKakao: {
                amount,
                deliveryFee,
                delivery: { name, postCode, address, detailAddress, memo },
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
          // 추후 에러 유형에 따라 분화할 필요
          history.push("/");
        });
    }
  }, [search]);
}
