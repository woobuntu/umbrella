import React, { useEffect } from "react";
import { BasketParallax } from "customs/components/basket";
import classNames from "classnames";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import PropTypes from "prop-types";

import { basketStyle } from "customs/assets/styles/basket";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(basketStyle);

export default function Basket({ cart, children }) {
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }, []);

  return (
    <div>
      <BasketParallax />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <Card plain>
            <CardBody plain>
              <h3 className={classes.cardTitle}>장바구니 목록</h3>
              {cart}
              {children}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

Basket.propTypes = {
  cart: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
