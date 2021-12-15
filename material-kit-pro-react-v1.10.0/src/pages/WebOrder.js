import React from "react";
import PropTypes from "prop-types";

// templates
import Order from "templates/Order";

// organisms
import ProductTable from "organisms/ProductTable";

// hooks
import useMakeProductTableDataForOrder from "hooks/useMakeProductTableDataForOrder";
import useBasketsAndProfile from "hooks/useBasketsAndProfileQuery";

export default function WebOrder() {
  const { products, userInfo, defaultDeliveryInfo } = useBasketsAndProfile();

  const tableHead = ["", "상품명", "옵션", "가격", "수량", "총금액"];
  const tableData = useMakeProductTableDataForOrder({ products });

  return (
    <Order
      products={products}
      userInfoFromServer={userInfo}
      defaultDeliveryInfoFromServer={defaultDeliveryInfo}
    >
      <ProductTable tableHead={tableHead} tableData={tableData} />
    </Order>
  );
}
