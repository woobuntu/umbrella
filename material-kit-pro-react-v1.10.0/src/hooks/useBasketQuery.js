import { useQuery, useReactiveVar } from "@apollo/client";
import { BASKETS } from "graphql/query";
import { isAuthenticatedVar } from "graphql/state";

export default function useBasket() {
  const role = useReactiveVar(isAuthenticatedVar);
  const { error, data } = useQuery(BASKETS, {
    skip: role === "non-user",
  });

  // 에러 핸들링은 추후 보완
  if (error) alert(error.message);

  if (!data) {
    return [];
  }

  const { baskets } = data;

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

  return convertedBaskets;
}
