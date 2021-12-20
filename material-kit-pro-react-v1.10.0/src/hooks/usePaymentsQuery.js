import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { PAYMENTS } from "graphql/query";
import { useHistory } from "react-router-dom";

export default function usePaymentsQuery() {
  const { error, data } = useQuery(PAYMENTS);

  const history = useHistory();
  useEffect(() => {
    if (error) {
      if (error.message == "Forbidden resource") history.push("/");
      alert(error);
    }
  }, [error]);

  if (!data) {
    return [];
  }

  const { payments } = data;

  return payments
    .map((payment) => ({
      ...payment,
      purchases: payment.purchases.map(
        ({
          id,
          quantity,
          productOptionRelation: {
            product: {
              id: productId,
              name: productName,
              price: productPrice,
              productFileRelations,
            },
            option: { name: optionName, price: optionPrice },
          },
        }) => {
          const [
            {
              file: { name: thumbnailAlt, path: thumbnailSrc },
            },
          ] = productFileRelations;
          return {
            basketId: id,
            thumbnailSrc,
            thumbnailAlt,
            productId,
            productName,
            optionName,
            quantity,
            price: productPrice + optionPrice,
            productTotalPrice: quantity * (productPrice + optionPrice),
          };
        }
      ),
    }))
    .sort(
      (
        { paymentHistories: paymentHistoriesOfA },
        { paymentHistories: paymentHistoriesOfB }
      ) => {
        const [{ from: fromA }] = paymentHistoriesOfA;
        const [{ from: fromB }] = paymentHistoriesOfB;
        if (fromA < fromB) return 1;
        return -1;
      }
    );
}
