import React from "react";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import {
  ProductParallax,
  ProductImages,
  Option,
} from "customs/components/product";

import { productStyle } from "customs/assets/styles";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import { convertPrice } from "../customs/utils";
import { AmountControlButtons } from "customs/components/common";
import { BasketButton } from "customs/components/product";
import {
  useProductQuery,
  useProductAmount,
  useProductOption,
  useBasketQuery,
} from "hooks";
import { useReactiveVar } from "@apollo/client";
import { isAuthenticatedVar } from "graphql/state";
import { useHistory } from "react-router";
import { useBasketMutation } from "hooks";
import { isModalOpenVar } from "graphql/state";
import { BASKETS } from "graphql/query";
import { setSessionItem } from "customs/utils/session-storage";
import Accordion from "components/Accordion/Accordion.js";
import InfoArea from "components/InfoArea/InfoArea";
import { LocalShipping, VerifiedUser } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles(productStyle);

export default function Product() {
  const classes = useStyles();

  const { productLoading, productError, productData } = useProductQuery();

  // 수량
  const { productAmount, setProductAmount } = useProductAmount();

  // 옵션
  const { productOption, setProductOption } = useProductOption(productData);

  // 장바구니 수량 때문에 호출 필요
  const basketData = useBasketQuery();

  const {
    basketMutations: { upsertBasket },
    basketMutationLoading,
    basketMutationError,
  } = useBasketMutation();

  const role = useReactiveVar(isAuthenticatedVar);

  const history = useHistory();

  const isDataLoading = productLoading || basketMutationLoading;
  if (isDataLoading) return <div>로딩중...</div>;

  const error = productError || basketMutationError;
  if (error) alert(error.message);

  const {
    product: {
      name,
      price,
      expirationDate,
      storageMethod,
      ingredients,
      productFileRelations,
      productOptionRelations,
    },
  } = productData;

  const [productOptionRelation] = productOptionRelations.filter(
    ({ option: { id } }) => id == productOption
  );

  const openModal = () => {
    isModalOpenVar(true);
  };

  const upsertBasketThenOpenModal = async () => {
    try {
      await upsertBasket({
        variables: {
          upsertBasketInput: {
            productOptionRelationId: productOptionRelation.id,
            quantity: productAmount,
          },
        },
        refetchQueries: [BASKETS],
      });
      isModalOpenVar(true);
    } catch (error) {
      alert(error.message);
    }
  };

  const onAddBasket =
    role !== "non-user" ? upsertBasketThenOpenModal : openModal;

  const redirectToBasket = () => history.push("/basket");

  const setSessionBasketThenRedirectToSignIn = () => {
    setSessionItem({
      key: "basket",
      value: {
        productOptionRelationId: productOptionRelation.id,
        quantity: productAmount,
      },
    });
    history.push("/sign-in");
  };

  const onModalOk =
    role !== "non-user"
      ? redirectToBasket
      : setSessionBasketThenRedirectToSignIn;

  const accordionCollapses = [];
  if (expirationDate) {
    accordionCollapses.push({
      title: "유통 기한",
      content: <p>{expirationDate}</p>,
    });
  }
  if (storageMethod) {
    accordionCollapses.push({
      title: "보관 방법",
      content: <p>{storageMethod}</p>,
    });
  }
  if (ingredients) {
    accordionCollapses.push({
      title: "재료",
      content: <p>{ingredients}</p>,
    });
  }
  return (
    <div className={classes.productPage}>
      <ProductParallax basketAmount={basketData ? basketData.length : 0} />
      <div className={classNames(classes.section, classes.sectionGray)}>
        <div className={classes.container}>
          <div className={classNames(classes.main, classes.mainRaised)}>
            <GridContainer>
              <GridItem md={6} sm={6}>
                <ProductImages
                  items={productFileRelations.map(({ file: { path } }) => ({
                    original: path,
                    thumbnail: path,
                  }))}
                />
              </GridItem>
              <GridItem md={6} sm={6}>
                <h2 className={classes.title}>{name}</h2>
                <h3 className={classes.mainPrice}>
                  ₩
                  {convertPrice(
                    price + Number(productOptionRelation?.option?.price)
                  )}
                </h3>
                <Accordion
                  active={accordionCollapses.map((_, index) => index)}
                  activeColor="info"
                  collapses={accordionCollapses}
                />
                <GridContainer className={classes.pickSize}>
                  <Option
                    value={productOption}
                    options={productOptionRelations.map(({ option }) => option)}
                    selectOption={({ target: { value } }) =>
                      setProductOption(value)
                    }
                  />
                  <GridItem md={6} sm={6}>
                    <label>수량 : </label>
                    {productAmount}
                    <br />
                    <AmountControlButtons
                      onAdd={setProductAmount}
                      onRemove={setProductAmount}
                    />
                  </GridItem>
                </GridContainer>
                <BasketButton onAddBasket={onAddBasket} onModalOk={onModalOk} />
              </GridItem>
            </GridContainer>
          </div>
          <div className={classNames(classes.features, classes.textCenter)}>
            <GridContainer>
              <GridItem md={4} sm={4}>
                <InfoArea
                  title="배송기한"
                  description="모든 제품은 주문 접수 후 제작되므로, 배송까지는 4일 가량 소요됩니다. (주말에 접수된 주문의 경우 차주 월요일에 제품 제작을 시작합니다)"
                  icon={LocalShipping}
                  vertical
                  iconColor="info"
                />
              </GridItem>
              <GridItem md={4} sm={4}>
                <InfoArea
                  title="배송비"
                  description="3,000원(구매금액 50,000원 이상 무료배송)"
                  icon={LocalShipping}
                  vertical
                  iconColor="warning"
                />
              </GridItem>
              <GridItem md={4} sm={4}>
                <Link to="/document/guide">
                  <InfoArea
                    title="교환 및 환불 정책"
                    description="클릭하시면 교환 및 환불 정책이 명시된, 이용안내 페이지로 안내해드립니다."
                    icon={VerifiedUser}
                    vertical
                    iconColor="success"
                  />
                </Link>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
