import React, { useEffect } from "react";
import { BasketParallax } from "customs/components/basket";
import classNames from "classnames";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import PropTypes from "prop-types";

import { basketStyle } from "customs/assets/styles/basket";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(basketStyle);

export default function Basket({ parallaxTitle, cardTitle, cart, children }) {
  const classes = useStyles();

  return (
    <div>
      <BasketParallax title={parallaxTitle} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <Card plain>
            <CardBody plain>
              <h3 className={classes.cardTitle}>{cardTitle}</h3>
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
  parallaxTitle: PropTypes.string,
  cardTitle: PropTypes.string,
  cart: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
