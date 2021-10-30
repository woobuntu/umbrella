import React from "react";
import { sectionCatalogsStyle } from "customs/assets/styles";
import { makeStyles } from "@material-ui/styles";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";
import { useQuery } from "@apollo/client";
import { CATALOGS } from "../../graphql";
import { Link } from "react-router-dom";

const useStyles = makeStyles(sectionCatalogsStyle);

export default function SectionCatalogs() {
  const classes = useStyles();

  const { loading, data, error } = useQuery(CATALOGS);

  function formPrice(price) {
    const stringPrice = price.toString();
    let converted = "";
    for (let i = stringPrice.length - 1; i >= 0; i--) {
      const nth = stringPrice.length - i;
      converted = stringPrice[i] + converted;
      if (nth % 3 == 0 && i !== 0) {
        converted = "," + converted;
      }
    }
    return converted;
  }

  if (error) alert(error.message);

  return loading ? (
    <div>로딩중...</div>
  ) : (
    <div className={classes.section}>
      <div className={classes.container}>
        <h2>상품 목록</h2>
        <GridContainer>
          {data.catalogs.map(
            ({
              id,
              name,
              price,
              catalogFileRelations: [catalogFileRelation],
            }) => {
              const {
                file: { path },
              } = catalogFileRelation;
              return (
                <GridItem md={4} sm={4} key={id}>
                  <Card product plain>
                    <CardHeader image plain>
                      <Link to="#">
                        <img src={path} />
                      </Link>
                      <div
                        className={classes.coloredShadow}
                        style={{ backgroundImage: `url(${path})`, opacity: 1 }}
                      />
                    </CardHeader>
                    <CardBody className={classes.textCenter} plain>
                      <h4 className={classes.cardTitle}>{name}</h4>
                      <p className={classes.cardDescription}>상품설명</p>
                    </CardBody>
                    <CardFooter plain>
                      <div className={classes.priceContainer}>
                        <span className={classes.price}>
                          ₩{formPrice(price)}
                        </span>
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
              );
            }
          )}
        </GridContainer>
      </div>
    </div>
  );
}
