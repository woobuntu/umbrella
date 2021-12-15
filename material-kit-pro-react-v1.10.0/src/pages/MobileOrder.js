import React from "react";

// organisms
import MobileProductList from "organisms/MobileProductList";

// templates
import Order from "templates/Order";
import useBasketsAndProfile from "hooks/useBasketsAndProfileQuery";

export default function MobileOrder() {
  const { products, userInfo, defaultDeliveryInfo } = useBasketsAndProfile();
  return (
    <Order
      products={products}
      userInfoFromServer={userInfo}
      defaultDeliveryInfoFromServer={defaultDeliveryInfo}
    >
      <MobileProductList products={products} />
    </Order>
  );
}
