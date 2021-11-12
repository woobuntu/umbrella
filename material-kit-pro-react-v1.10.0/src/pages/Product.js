import React, { useState, useEffect } from "react";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import {
  ProductParallax,
  ProductImages,
  Option,
} from "customs/components/product";

import { productStyle } from "customs/assets/styles";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import { useQuery, useReactiveVar } from "@apollo/client";
import { PRODUCT } from "../graphql/query";
import { convertPrice } from "../customs/utils";
import { AmountControlButtons } from "customs/components/common";
import { BasketButton } from "customs/components/product";
import { isAuthenticatedVar } from "graphql/state";

const useStyles = makeStyles(productStyle);

export default function Product({ setBasket, basketAmount }) {
  const classes = useStyles();

  const isAuthenticated = useReactiveVar(isAuthenticatedVar);

  let { id } = useParams();

  const { loading, error, data } = useQuery(PRODUCT, {
    variables: { catalogId: Number(id) },
  });

  const [option, setOption] = useState();
  const [amount, setAmount] = useState(1);

  const controlAmount = ({ currentTarget: { name } }) => {
    switch (name) {
      case "add":
        setAmount(amount + 1);
        break;
      case "remove":
        if (amount > 1) setAmount(amount - 1);
        break;
      default:
        alert("수량을 늘리거나 줄일 수만 있습니다!");
    }
  };

  useEffect(() => {
    if (data) {
      const {
        catalog: { catalogOptionRelations },
      } = data;
      const [firstOption] = catalogOptionRelations;
      const { option } = firstOption;
      setOption(option.id);
    }
  }, [data]);

  if (error) alert(error.message);

  if (loading) return <div>로딩중...</div>;

  const {
    catalog: { name, price, catalogFileRelations, catalogOptionRelations },
  } = data;

  const [catalogOptionRelation] = catalogOptionRelations.filter(
    ({ option: { id } }) => id == option
  );

  return (
    <div className={classes.productPage}>
      <ProductParallax basketAmount={basketAmount} />
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
                    value={option}
                    options={catalogOptionRelations.map(({ option }) => option)}
                    selectOption={({ target: { value } }) => setOption(value)}
                  />
                  <GridItem md={6} sm={6}>
                    <label>수량 : </label>
                    {amount}
                    <br />
                    <AmountControlButtons
                      onAdd={controlAmount}
                      onRemove={controlAmount}
                    />
                  </GridItem>
                </GridContainer>
                <BasketButton
                  onAdd={setBasket(
                    isAuthenticated
                      ? {
                          catalogOptionRelationId: catalogOptionRelation?.id,
                          amount,
                        }
                      : { productId: id, option, amount }
                  )}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

Product.propTypes = {
  setBasket: PropTypes.func,
  basketAmount: PropTypes.number,
};
