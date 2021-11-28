import React, { Fragment, useEffect } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import {
  getSessionItem,
  removeSessionItem,
} from "customs/utils/session-storage";
import { usePurchaseMuation } from "hooks";
import Parallax from "components/Parallax/Parallax";
import { successStyle } from "customs/assets/styles";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import { convertPrice } from "customs/utils";

const useStyles = makeStyles(successStyle);

export default function Success() {
  const classes = useStyles();

  const { search } = useLocation();

  const {
    purchaseMutations: { createPurchase },
  } = usePurchaseMuation();

  const sessionPurchase = getSessionItem("purchase");

  const history = useHistory();

  useEffect(() => {
    if (search && sessionPurchase) {
      const { amount, orderId, paymentKey } = queryString.parse(search);
      const { orderer, delivery, payment } = sessionPurchase;
      const variables = {
        createPurchaseInput: {
          delivery,
          orderer,
          payment: {
            ...payment,
            amount: Number(amount),
            orderId,
            paymentKey,
          },
        },
      };
      createPurchase({ variables });
    } else {
      history.push("/");
    }
    return () => {
      removeSessionItem("purchase");
    };
  }, []);

  const parallaxUrl =
    "https://woobuntu-umbrella.s3.ap-northeast-2.amazonaws.com/%E1%84%92%E1%85%A1%E1%86%B7%E1%84%81%E1%85%A6%E1%84%8A%E1%85%B3%E1%84%82%E1%85%B3%E1%86%AB%E1%84%8B%E1%85%AE%E1%84%89%E1%85%A1%E1%86%AB.jpg";

  console.log(sessionPurchase);

  const { amount } = queryString.parse(search);

  return (
    <Fragment>
      <Parallax image={parallaxUrl} filter="dark" small />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <div className={classes.pricingSection}>
            <GridContainer>
              <GridItem xs={12} sm={4} md={4} className={classes.mlAuto}>
                <Card pricing color="success">
                  <CardBody pricing>
                    <h3
                      style={{ color: "white" }}
                      className={
                        classes.cardCategory + " " + classes.marginBottom30
                      }
                    >
                      배송 정보
                    </h3>
                    <ul>
                      <li>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <span>받는 사람</span>
                          <span>
                            <b>{sessionPurchase?.delivery?.name}</b>
                          </span>
                        </div>
                      </li>
                      <li>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <p style={{ width: "100%", textAlign: "start" }}>
                            받는 주소
                          </p>
                          <p style={{ width: "100%", textAlign: "start" }}>
                            <b>{sessionPurchase?.delivery?.address}</b>
                          </p>
                        </div>
                      </li>
                      <li>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <p style={{ width: "100%", textAlign: "start" }}>
                            배송요청사항
                          </p>
                          <p style={{ width: "100%", textAlign: "start" }}>
                            <b>{sessionPurchase?.delivery?.memo}</b>
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={4} md={4} className={classes.mrAuto}>
                <Card pricing color="primary">
                  <CardBody pricing>
                    <h3
                      style={{ color: "white" }}
                      className={
                        classes.cardCategory + " " + classes.marginBottom30
                      }
                    >
                      결제 정보
                    </h3>
                    <ul>
                      <li>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <span>총 상품가격</span>
                          <span>
                            <b>{convertPrice(amount - 3000)}원</b>
                          </span>
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
                          <span>배송비</span>
                          <span>
                            <b>3,000원</b>
                          </span>
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
                          <span>총 결제금액</span>
                          <span>
                            <b>{convertPrice(amount)}원</b>
                          </span>
                        </div>
                      </li>
                    </ul>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
