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

const useStyles = makeStyles(productStyle);

export default function Product() {
  const classes = useStyles();

  const { productLoading, productError, productData } = useProductQuery();

  // 수량
  const { productAmount, setProductAmount } = useProductAmount();

  // 옵션
  const { productOption, setProductOption } = useProductOption(productData);

  // 장바구니 수량 때문에 호출 필요
  const { basketLoading, basketError, basketData } = useBasketQuery();

  const {
    basketMutations: { upsertBasket },
    basketMutationLoading,
    basketMutationError,
  } = useBasketMutation();

  const isAuthenticated = useReactiveVar(isAuthenticatedVar);

  const history = useHistory();

  const isDataLoading =
    productLoading || basketLoading || basketMutationLoading;
  if (isDataLoading) return <div>로딩중...</div>;

  const error = productError || basketError || basketMutationError;
  if (error) alert(error.message);

  const {
    catalog: { name, price, catalogFileRelations, catalogOptionRelations },
  } = productData;

  const [catalogOptionRelation] = catalogOptionRelations.filter(
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
            catalogOptionRelationId: catalogOptionRelation.id,
            amount: productAmount,
          },
        },
        refetchQueries: [BASKETS],
      });
      isModalOpenVar(true);
    } catch (error) {
      alert(error.message);
    }
  };

  const onAddBasket = isAuthenticated ? upsertBasketThenOpenModal : openModal;

  const redirectToBasket = () => history.push("/basket");

  const setSessionBasketThenRedirectToSignIn = () => {
    setSessionItem({
      key: "basket",
      value: {
        catalogOptionRelationId: catalogOptionRelation.id,
        amount: productAmount,
      },
    });
    history.push("/sign-in");
  };

  const onModalOk = isAuthenticated
    ? redirectToBasket
    : setSessionBasketThenRedirectToSignIn;

  return (
    <div className={classes.productPage}>
      <ProductParallax basketAmount={basketData ? basketData.length : 0} />
      <div className={classNames(classes.section, classes.sectionGray)}>
        <div className={classes.container}>
          <div className={classNames(classes.main, classes.mainRaised)}>
            <GridContainer>
              <GridItem md={6} sm={6}>
                <ProductImages
                  items={catalogFileRelations.map(({ file: { path } }) => ({
                    original: path,
                    thumbnail: path,
                  }))}
                />
              </GridItem>
              <GridItem md={6} sm={6}>
                <h2 className={classes.title}>{name}</h2>
                <h3 className={classes.mainPrice}>₩{convertPrice(price)}</h3>
                <GridContainer className={classes.pickSize}>
                  <Option
                    value={productOption}
                    options={catalogOptionRelations.map(({ option }) => option)}
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
        </div>
      </div>
    </div>
  );
}
