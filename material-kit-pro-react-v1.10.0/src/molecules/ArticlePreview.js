import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import React from "react";
import { Link } from "react-router-dom";
import PropTypes, { number, string } from "prop-types";
import { makeStyles } from "@material-ui/styles";

import { coloredShadow, cardTitle } from "assets/jss/material-kit-pro-react.js";
import CardBody from "components/Card/CardBody";
import Info from "components/Typography/Info";
import { Title } from "atoms/Title";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles({
  coloredShadow,
  cardTitle,
  card: {
    marginBottom: "80px",
  },
  cardCategory: {
    marginBottom: "0",
    marginTop: "10px",
    "& svg,& .fab,& .fas,& .far,& .fal,& .material-icons": {
      position: "relative",
      top: "8px",
      lineHeight: "0",
    },
  },
});

export default function ArticlePreview({ id, title, content, timestamp }) {
  let imgSrc = "";
  const parsedContent = JSON.parse(content);
  for (const { insert } of parsedContent) {
    if (insert.hasOwnProperty("image")) {
      imgSrc = insert.image;
      break;
    }
  }
  const classes = useStyles();
  const imgUrl = imgSrc
    ? imgSrc
    : "https://woobuntu-umbrella.s3.ap-northeast-2.amazonaws.com/logo.png";
  const { pathname } = useLocation();
  const [_, subject] = pathname.split("/");

  const regex = new RegExp(/^(\d{4})-(\d{2})-(\d{2})T\d{2}:\d{2}:\d{2}.000Z/);
  const [year, month, day] = timestamp.match(regex).slice(1);

  return (
    <Card plain blog className={classes.card}>
      <CardHeader
        plain
        image
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div
          style={{
            height: "250px",
            width: "250px",
            display: "table-cell",
            verticalAlign: "middle",
            textAlign: "center",
          }}
        >
          <Link to={`/${subject}/${id}`}>
            <img src={imgUrl} />
          </Link>
        </div>
      </CardHeader>
      <CardBody plain>
        <Info>
          <Title size={6} className={classes.cardCategory}>
            {`${year}년 ${month}월 ${day}일`}
          </Title>
        </Info>
        <Title size={4} className={classes.cardTitle}>
          {title}
        </Title>
      </CardBody>
    </Card>
  );
}

ArticlePreview.propTypes = {
  id: number,
  title: string,
  content: string,
  timestamp: string,
};
