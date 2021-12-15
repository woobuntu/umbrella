import { gql } from "@apollo/client";

const CREATE_PAYMENT_BY_TOSS = gql`
  mutation Mutation($tossPaymentsInput: TossPaymentsInput!) {
    createPaymentByToss(tossPaymentsInput: $tossPaymentsInput) {
      amount
      deliveryFee
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

export default CREATE_PAYMENT_BY_TOSS;
