import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";

// atoms
import { UserName } from "atoms/Title";
import { Title } from "atoms/Title";

const useStyles = makeStyles({
  name: {
    marginTop: "-80px",
  },
});

export default function UserNameAndPosition({ name, position }) {
  const classes = useStyles();

  return (
    <div className={classes.name}>
      <UserName>{name}</UserName>
      <Title size={6}>{position}</Title>
    </div>
  );
}

UserNameAndPosition.defaultProps = {
  position: "직책",
};

UserNameAndPosition.propTypes = {
  name: PropTypes.string,
  position: PropTypes.string,
};
