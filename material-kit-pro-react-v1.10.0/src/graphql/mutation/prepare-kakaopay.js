import { gql } from "@apollo/client";

const PREPARE_KAKAOPAY = gql`
  mutation PrepareKakaoPayment {
    prepareKakaoPayment {
      mobileRedirectUrl
      webRedirectUrl
    }
  }
`;

export default PREPARE_KAKAOPAY;
