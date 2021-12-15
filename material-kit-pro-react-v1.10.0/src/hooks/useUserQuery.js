import { useQuery } from "@apollo/client";
import { PROFILE } from "graphql/query";

export default function useUserQuery() {
  const { error, data } = useQuery(PROFILE);

  // 에러 핸들링은 추후 보완
  if (error) alert(error.message);

  if (!data) {
    return {
      userInfo: {
        name: "",
        phone: "010--",
        email: "",
      },
      defaultDeliveryInfo: {
        id: 0,
        name: "",
        phone: "",
        postCode: "",
        address: "",
        detailAddress: "",
        memo: "",
      },
      payments: [],
    };
  }

  const {
    profile: { name, phone, email, defaultDelivery, payments },
  } = data;

  return {
    userInfo: {
      name: name || "",
      phone: phone || "010--",
      email: email || "",
    },
    defaultDeliveryInfo: {
      id: defaultDelivery.id || 0,
      name: defaultDelivery.name || "",
      phone: defaultDelivery.phone || "010--",
      postCode: defaultDelivery.postCode || "",
      address: defaultDelivery.address || "",
      detailAddress: defaultDelivery.detailAddress || "",
      memo: defaultDelivery.memo || "",
    },
    payments: payments.map((payment) => ({
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
    })),
  };
}
