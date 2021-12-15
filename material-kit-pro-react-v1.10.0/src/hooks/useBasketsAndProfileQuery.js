import { useQuery } from "@apollo/client";
import BASKETS_AND_PROFILE from "graphql/query/basketsAndProfile";

export default function useBasketsAndProfile() {
  const { error, data } = useQuery(BASKETS_AND_PROFILE);

  // 에러 핸들링은 추후 보완
  if (error) alert(error.message);

  if (!data) {
    return {
      products: [],
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
    };
  }
  const {
    baskets,
    profile: { name, phone, email, defaultDelivery },
  } = data;

  const convertedBaskets = baskets.map(
    ({
      id,
      quantity,
      productOptionRelationId,
      productOptionRelation: { product, option },
    }) => {
      const { productFileRelations } = product;
      // 지금은 첫번째 이미지를 썸네일로 쓰고 있지만, 추후 칼럼 하나 늘려서 썸네일을 지정할 것
      const { file: thumbnail } = productFileRelations[0];

      const price = product.price + option.price;
      const productTotalPrice = price * quantity;

      return {
        basketId: id,
        productId: product.id,
        productOptionRelationId,
        productName: product.name,
        optionName: option.name,
        thumbnailSrc: thumbnail.path,
        thumbnailAlt: thumbnail.name,
        quantity,
        price,
        productTotalPrice,
      };
    }
  );

  return {
    products: convertedBaskets,
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
  };
}
