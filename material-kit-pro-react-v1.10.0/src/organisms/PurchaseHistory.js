import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import ProductTable from "./ProductTable";
import getIsMobile from "utils/getIsMobile";
import MobileProductList from "./MobileProductList";
import useMakeProductTableDataForPurchaseHistory from "hooks/useMakeProductTableDataForPurchaseHistory";
import { Title } from "atoms/Title";
import { convertTime } from "utils";
import Button from "components/CustomButtons/Button";
import FlexEnd from "atoms/Container/FlexEnd";
import ReceiverInfoCard from "./ReceiverInfoCard";
import PaymentResultCard from "./PaymentResultCard";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { makeStyles } from "@material-ui/styles";
import { mlAuto, mrAuto } from "assets/jss/material-kit-pro-react.js";

const useStyles = makeStyles({
  mlAuto,
  mrAuto,
});
export default function PurchaseHistory({ payment, setDetailPurchaseId }) {
  const classes = useStyles();
  const {
    purchases,
    paymentHistories,
    delivery,
    deliveryFee,
    amount,
    orderStatus,
  } = payment;

  const [{ from }] = paymentHistories;

  const tableHead = ["", "상품명", "옵션", "가격", "수량", "총금액"];

  const isMobile = getIsMobile();

  const tableData = useMakeProductTableDataForPurchaseHistory({ purchases });

  const [isDetailButtonClicked, setIsDetailButtonClicked] = useState(false);

  const onClickDetailButton = () => {
    setDetailPurchaseId(payment.id);
    setIsDetailButtonClicked(true);
  };
  const goBackToPurchaseHistories = () => {
    setDetailPurchaseId(null);
    setIsDetailButtonClicked(false);
  };

  // orderStatus
  // 결제대기 : 가상계좌의 경우
  // 결제완료 : 결제확인
  // 상품준비중 : 작업 들어갔을 때
  // 배송시작 : 배송조회?
  // 배송중 : 배송조회
  // 배송완료 :
  // 영광인쇄
  return (
    <Fragment>
      <Title size={3}>{convertTime(from)} 주문</Title>
      {isMobile ? (
        <MobileProductList products={purchases} />
      ) : (
        <ProductTable tableHead={tableHead} tableData={tableData} />
      )}
      <FlexEnd>
        <Button
          color="info"
          onClick={
            isDetailButtonClicked
              ? goBackToPurchaseHistories
              : onClickDetailButton
          }
        >
          {isDetailButtonClicked ? "주문내역으로 돌아가기" : "주문 상세 보기"}
        </Button>
      </FlexEnd>
      {isDetailButtonClicked && (
        <GridContainer>
          <GridItem xs={12} sm={4} md={4} className={classes.mlAuto}>
            <ReceiverInfoCard {...delivery} />
          </GridItem>
          <GridItem xs={12} sm={4} md={4} className={classes.mrAuto}>
            <PaymentResultCard
              basketTotalPrice={amount - deliveryFee}
              deliveryFee={deliveryFee}
            />
          </GridItem>
        </GridContainer>
      )}
      {/* 주문 내역으로 돌아가기 */}
      {/* 주문취소 */}
      {/* 배송조회 */}
      {/* 배송지 변경 */}
      {/* 환불 문의 -> 채널톡 */}
    </Fragment>
  );
}

PurchaseHistory.propTypes = {
  setDetailPurchaseId: PropTypes.func,
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
