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
import { PRODUCTS } from "../../graphql/query";
import { Link } from "react-router-dom";
import { convertPrice } from "customs/utils";

const useStyles = makeStyles(sectionCatalogsStyle);

export default function SectionCatalogs() {
  const classes = useStyles();

  const { loading, data, error } = useQuery(PRODUCTS);

  if (error) alert(error.message);

  if (loading) console.log("로딩중...");

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <h2>상품 목록</h2>
        <GridContainer>
          {data &&
            data.products.map(
              ({
                id,
                name,
                price,
                productFileRelations: [productFileRelation],
              }) => {
                const {
                  file: { path },
                } = productFileRelation;
                return (
                  <GridItem md={4} sm={4} key={id}>
                    <Card product plain>
                      <CardHeader image plain>
                        <Link to={`/mall/${id}`}>
                          <img src={path} />
                        </Link>
                        <div
                          className={classes.coloredShadow}
                          style={{
                            backgroundImage: `url(${path})`,
                            opacity: 1,
                          }}
                        />
                      </CardHeader>
                      <CardBody className={classes.textCenter} plain>
                        <h4 className={classes.cardTitle}>{name}</h4>
                        {/* <p className={classes.cardDescription}>상품설명</p> */}
                      </CardBody>
                      <CardFooter plain>
                        <div className={classes.priceContainer}>
                          <span className={classes.price}>
                            ₩{convertPrice(price)}
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
