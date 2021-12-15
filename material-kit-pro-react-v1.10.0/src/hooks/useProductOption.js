import { useEffect, useState } from "react";

export default function useProductOption(productData) {
  const [option, setOption] = useState();

  useEffect(() => {
    if (productData) {
      const {
        product: { productOptionRelations },
      } = productData;

      const [firstOption] = productOptionRelations;

      const { option } = firstOption;

      setOption(option.id);
    }
  }, [productData]);

  return {
    productOption: option,
    setProductOption: setOption,
  };
}
