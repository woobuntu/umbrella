import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Info from "components/Typography/Info.js";
import Danger from "components/Typography/Danger.js";
import Success from "components/Typography/Success.js";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";

import {
  coloredShadow,
  cardTitle,
  description,
} from "assets/jss/material-kit-pro-react.js";
import { Title } from "atoms/Title";

const useStyles = makeStyles({
  coloredShadow,
  cardCategory: {
    marginBottom: "0",
    marginTop: "10px",
    "& svg,& .fab,& .fas,& .far,& .fal,& .material-icons": {
      position: "relative",
      top: "8px",
      lineHeight: "0",
    },
  },
  cardTitle,
  description,
});

export default function BlogSummary({
  to,
  imgSrc,
  imgName,
  blogTitle,
  blogSubTitle,
  blogSummary,
}) {
  const classes = useStyles();
  return (
    <Card plain blog>
      <CardHeader plain image>
        <Link to={to}>
          <img src={imgSrc} alt={imgName} />
        </Link>
        <div
          className={classes.coloredShadow}
          style={{
            backgroundImage: `url(${imgSrc})`,
            opacity: "1",
          }}
        ></div>
      </CardHeader>
      <CardBody plain>
        <Info>
          <h6 className={classes.cardCategory}>{blogTitle}</h6>
        </Info>
        <h4 className={classes.cardTitle}>
          <Link>{blogSubTitle}</Link>
        </h4>
        <p className={classes.description}>{blogSummary}</p>
      </CardBody>
    </Card>
  );
}

BlogSummary.defaultProps = {
  to: "#",
};

BlogSummary.propTypes = {
  to: PropTypes.string,
  imgSrc: PropTypes.string,
  imgName: PropTypes.string,
  blogTitle: PropTypes.string,
  blogSubTitle: PropTypes.string,
  blogSummary: PropTypes.string,
};
