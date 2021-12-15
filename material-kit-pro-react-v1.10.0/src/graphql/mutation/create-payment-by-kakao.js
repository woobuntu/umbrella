import { gql } from "@apollo/client";

const CREATE_PAYMENT_BY_KAKAO = gql`
  mutation CreatePaymentByKakao($pgToken: String!) {
    createPaymentByKakao(pgToken: $pgToken) {
      amount
      deliveryFee
      orderer {
        name
        phone
        email
      }
      delivery {
        name
        phone
        postCode
        address
        detailAddress
        memo
      }
    }
  }
`;

export default CREATE_PAYMENT_BY_KAKAO;
