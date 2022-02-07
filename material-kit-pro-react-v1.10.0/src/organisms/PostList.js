import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import {
  container,
  mlAuto,
  mrAuto,
  title,
} from "assets/jss/material-kit-pro-react.js";

import Button from "components/CustomButtons/Button";
import { useHistory, useLocation } from "react-router-dom";
import { useBlogsQuery } from "hooks";
import { ArticlePreview } from "molecules";
import { useReactiveVar } from "@apollo/client";
import { isAuthenticatedVar } from "graphql/state";

const useStyles = makeStyles({
  blog: {
    padding: "50px 0",
  },
  container,
  mlAuto,
  mrAuto,
  title,
});

export default function PostList() {
  const classes = useStyles();

  const history = useHistory();

  const { pathname } = useLocation();

  const { data, refetch } = useBlogsQuery(pathname.split("/")[1]);

  useEffect(() => {
    refetch();
  }, []);

  const role = useReactiveVar(isAuthenticatedVar);

  return (
    <Fragment>
      <div className={classes.blog}>
        <div className={classes.container}>
          <GridContainer>
            {/* 이건 관리자한테만 보여야 하지 */}
            {role === "admin" && (
              <GridItem
                xs={12}
                sm={12}
                md={10}
                className={classes.mlAuto + " " + classes.mrAuto}
              >
                <Button
                  style={{ float: "right", margin: "2rem 0" }}
                  color="info"
                  onClick={() => history.push(`${pathname}/new`)}
                >
                  글쓰기
                </Button>
              </GridItem>
            )}

            <GridItem
              xs={12}
              sm={12}
              md={10}
              className={classes.mlAuto + " " + classes.mrAuto}
            >
              {data.map((items, index) => (
                <GridContainer key={index}>
                  {items.map(
                    ({ id, title, content, timestamp }, innerIndex) => (
                      <GridItem xs={12} sm={4} md={4} key={innerIndex}>
                        <ArticlePreview
                          id={id}
                          title={title}
                          content={content}
                          timestamp={timestamp}
                        />
                      </GridItem>
                    )
                  )}
                </GridContainer>
              ))}
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </Fragment>
  );
}
