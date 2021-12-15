import { loadTossPayments } from "@tosspayments/sdk";

export default async function requestTossPayments({ method, payload }) {
  return loadTossPayments(process.env.REACT_APP_TOSS_CLIENT_ID)
    .then((tossPayments) => tossPayments.requestPayment(method, payload))
    .catch((error) => alert(error.message));
}
