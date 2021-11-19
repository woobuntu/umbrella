import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { careerStyle } from "customs/assets/styles/profile";
import { makeStyles } from "@material-ui/core";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { Collapse, List, ListItem } from "@material-ui/core";

const useStyles = makeStyles(careerStyle);

export default function Career({ careers }) {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={8} md={8}>
          <h3 className={classes.title}>이력</h3>
          <List>
            {careers.map(([classfication, career]) => (
              <Fragment key={classfication}>
                <ListItem>{classfication}</ListItem>
                <List>
                  {career.map(({ id, record }) => (
                    <ListItem key={id} className={classes.nested}>
                      {record}
                    </ListItem>
                  ))}
                </List>
              </Fragment>
            ))}
          </List>
        </GridItem>
      </GridContainer>
    </div>
  );
}

Career.propTypes = {
  careers: PropTypes.array,
};
