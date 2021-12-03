import React, { useEffect } from "react";
import Basket from "./Basket";
import PropTypes from "prop-types";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { Orderer, Delivery } from "customs/components/order";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";
import { convertPrice } from "customs/utils";
import Button from "components/CustomButtons/Button";
import { useHistory } from "react-router-dom";
import { useTossPayments } from "hooks";

export default function Order({ cart, totalPrice, basketData }) {
  const history = useHistory();

  // 주문 페이지에서 새로고침하면 반드시 홈으로 리다이렉트 되므로 수정 필요
  useEffect(() => {
    if (!basketData) history.push("/");
  }, [basketData]);

  const deliveryFee = totalPrice > 30000 ? 0 : 3000;

  const { ordererProps, deliveryProps, onPay } = useTossPayments({
    basketData,
    totalPrice: deliveryFee + totalPrice,
  });

  return (
    <Basket parallaxTitle="주문하기" cardTitle="주문 목록" cart={cart}>
      <GridContainer justify="space-between">
        <GridItem md={6} sm={6}>
          <Orderer {...ordererProps} />
          <Delivery {...deliveryProps} />
        </GridItem>
        <GridItem md={4} sm={4}>
          <Card raised pricing color="primary">
            <CardBody>
              <h4 style={{ fontWeight: "bold" }}>결제정보</h4>
              <ul>
                <li>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>총상품금액</span>
                    <span>{convertPrice(totalPrice)}원</span>
                  </div>
                </li>
                <li>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>배송료</span>
                    <span>{convertPrice(deliveryFee)}원</span>
                  </div>
                </li>
                <li>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>
                      <strong>최종 결제금액</strong>
                    </span>
                    <span>
                      <strong>
                        {convertPrice(totalPrice + deliveryFee)}원
                      </strong>
                    </span>
                  </div>
                </li>
              </ul>
            </CardBody>
            <CardFooter>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Button
                  color="white"
                  round
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    fontWeight: "bold",
                  }}
                  onClick={() => onPay({ method: "카드", deliveryFee })}
                >
                  신용카드
                </Button>
                <Button
                  color="white"
                  round
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    fontWeight: "bold",
                  }}
                  onClick={() => onPay({ method: "가상계좌", deliveryFee })}
                >
                  가상계좌
                </Button>
                <Button
                  color="white"
                  round
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    fontWeight: "bold",
                  }}
                  onClick={() => onPay({ method: "계좌이체", deliveryFee })}
                >
                  계좌이체
                </Button>
                <Button
                  color="white"
                  round
                  style={{
                    backgroundColor: "#3182f6",
                    color: "white",
                    fontWeight: "bold",
                  }}
                  onClick={() => onPay({ method: "토스결제", deliveryFee })}
                >
                  토스 간편결제
                </Button>
                {/* <Button
                  color="white"
                  round
                  style={{
                    backgroundColor: "#03C75A",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  네이버페이로 결제하기
                </Button>
                <Button
                  color="white"
                  round
                  style={{
                    backgroundColor: "#FEE500",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  카카오페이로 결제하기
                </Button> */}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </Basket>
  );
}

Order.propTypes = {
  cart: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  totalPrice: PropTypes.number,
  basketData: PropTypes.array,
};
