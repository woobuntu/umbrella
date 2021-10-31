import React, { useState, useEffect } from "react";
import Parallax from "components/Parallax/Parallax";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Button from "components/CustomButtons/Button.js";
import ImageGallery from "react-image-gallery";
import { useParams } from "react-router-dom";

import ShoppingCart from "@material-ui/icons/ShoppingCart";

import { productStyle } from "customs/assets/styles";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import { useQuery } from "@apollo/client";
import { PRODUCT } from "../graphql";
import { convertPrice } from "../customs/utils";
import { FormControl, Select, MenuItem } from "@material-ui/core";

const useStyles = makeStyles(productStyle);

export default function Product() {
  const classes = useStyles();

  const parallaxUrl =
    "https://woobuntu-umbrella.s3.ap-northeast-2.amazonaws.com/%E1%84%92%E1%85%A1%E1%86%B7%E1%84%81%E1%85%A6%E1%84%8A%E1%85%B3%E1%84%82%E1%85%B3%E1%86%AB%E1%84%8B%E1%85%AE%E1%84%89%E1%85%A1%E1%86%AB.jpg";

  let { id } = useParams();

  const { loading, error, data } = useQuery(PRODUCT, {
    variables: { catalogId: Number(id) },
  });

  const [option, setOption] = useState();

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

  return (
    <div className={classes.productPage}>
      <Parallax
        image={parallaxUrl}
        filter="dark"
        className={classes.pageHeader}
      >
        <div className={classes.container}>
          <GridContainer className={classes.titleRow}>
            <GridItem md={4} className={classes.mlAuto}>
              <Button color="white" className={classes.floatRight}>
                <ShoppingCart /> 0 items
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.section, classes.sectionGray)}>
        <div className={classes.container}>
          <div className={classNames(classes.main, classes.mainRaised)}>
            <GridContainer>
              <GridItem md={6} sm={6}>
                <ImageGallery
                  showFullscreenButton={false}
                  showPlayButton={false}
                  startIndex={0}
                  items={catalogFileRelations.map(({ file: { path } }) => ({
                    original: path,
                    thumbnail: path,
                  }))}
                  showThumbnails={true}
                  renderLeftNav={(onClick, disabled) => {
                    return (
                      <button
                        className="image-gallery-left-nav"
                        disabled={disabled}
                        onClick={onClick}
                      />
                    );
                  }}
                  renderRightNav={(onClick, disabled) => {
                    return (
                      <button
                        className="image-gallery-right-nav"
                        disabled={disabled}
                        onClick={onClick}
                      />
                    );
                  }}
                />
              </GridItem>
              <GridItem md={6} sm={6}>
                <h2 className={classes.title}>{name}</h2>
                <h3 className={classes.mainPrice}>₩{convertPrice(price)}</h3>
                <GridContainer className={classes.pickSize}>
                  <GridItem md={6} sm={6}>
                    <label>옵션</label>
                    <FormControl
                      fullWidth
                      className={classes.selectFormControl}
                    >
                      {option && (
                        <Select
                          value={option}
                          onChange={(event) => setOption(event.target.value)}
                          inputProps={{
                            name: "optionSelect",
                            id: "option-select",
                          }}
                        >
                          {catalogOptionRelations.map(
                            ({ option: { id, name } }) => (
                              <MenuItem
                                key={id}
                                value={id}
                                classes={{
                                  root: classes.selectMenuItem,
                                  selected: classes.selectMenuItemSelected,
                                }}
                              >
                                {name}
                              </MenuItem>
                            )
                          )}
                        </Select>
                      )}
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <GridContainer className={classes.pullRight}>
                  <Button round color="rose">
                    장바구니에 담기 &nbsp; <ShoppingCart />
                  </Button>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
