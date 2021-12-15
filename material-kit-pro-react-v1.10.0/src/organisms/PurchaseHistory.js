import React, { Fragment } from "react";
import PropTypes from "prop-types";
import ProductTable from "./ProductTable";
import getIsMobile from "utils/getIsMobile";
import MobileProductList from "./MobileProductList";
import useMakeProductTableDataForPurchaseHistory from "hooks/useMakeProductTableDataForPurchaseHistory";
import { Title } from "atoms/Title";
import { convertTime } from "utils";

export default function PurchaseHistory({ payment }) {
  const { purchases, paymentHistories } = payment;

  const [{ from }] = paymentHistories;

  const tableHead = ["", "상품명", "옵션", "가격", "수량", "총금액"];

  const isMobile = getIsMobile();

  const tableData = useMakeProductTableDataForPurchaseHistory({ purchases });

  return (
    <Fragment>
      {/* ~월 ~일 주문 */}
      <Title size={3}>{convertTime(from)} 주문</Title>
      {isMobile ? (
        <MobileProductList products={purchases} />
      ) : (
        <ProductTable tableHead={tableHead} tableData={tableData} />
      )}
      {/* 받는 사람 정보 + 결제정보 */}
      {/* 주문 상세보기 */}
      {/* 주문 내역으로 돌아가기 */}
      {/* 주문취소 */}
      {/* 배송조회 */}
      {/* 배송지 변경 */}
      {/* 환불 문의 -> 채널톡 */}
    </Fragment>
  );
}

PurchaseHistory.propTypes = {
  payment: PropTypes.shape({
    id: PropTypes.number,
    amount: PropTypes.number,
    deliveryFee: PropTypes.number,
    orderStatus: PropTypes.string,
    type: PropTypes.string,
    platform: PropTypes.string,
    delivery: PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string,
      postCode: PropTypes.string,
      address: PropTypes.string,
      detailAddress: PropTypes.string,
      memo: PropTypes.string,
    }),
    orderer: PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
    }),
    purchases: PropTypes.arrayOf(
      PropTypes.shape({
        basketId: PropTypes.number,
        thumbnailSrc: PropTypes.string,
        thumbnailAlt: PropTypes.string,
        productId: PropTypes.number,
        productName: PropTypes.string,
        optionName: PropTypes.string,
        quantity: PropTypes.number,
        price: PropTypes.number,
        productTotalPrice: PropTypes.number,
      })
    ),
    paymentHistories: PropTypes.arrayOf(
      PropTypes.shape({
        from: PropTypes.string,
        to: PropTypes.string,
      })
    ),
  }),
};
