import React from "react";
import { greetingStyle } from "customs/assets/styles/profile";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import PropTypes from "prop-types";

const useStyles = makeStyles(greetingStyle);

export default function Greeting({ greetings, autograph }) {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={8} md={8}>
          <h3 className={classes.title}>드리는 말씀</h3>
          {greetings.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </GridItem>
      </GridContainer>
      <GridContainer justify="center">
        <GridItem xs={12} sm={8} md={8}>
          <img
            src={autograph.path}
            alt={autograph.name}
            className={classes.floatRight}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}

Greeting.propTypes = {
  greetings: PropTypes.array,
  autograph: PropTypes.object,
};
