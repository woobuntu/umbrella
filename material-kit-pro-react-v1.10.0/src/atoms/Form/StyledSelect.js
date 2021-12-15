import React from "react";
import PropTypes from "prop-types";

// atoms
import { Select } from "@material-ui/core";

// styles
import { makeStyles } from "@material-ui/styles";
import { whiteColor, grayColor } from "assets/jss/material-kit-pro-react.js";
const useStyles = makeStyles({
  select: {
    padding: "12px 0 7px",
    fontSize: ".75rem",
    fontWeight: "400",
    lineHeight: "1.42857",
    textDecoration: "none",
    textTransform: "uppercase",
    color: grayColor[1],
    letterSpacing: "0",
    "&:focus": {
      backgroundColor: "transparent",
    },
    "&[aria-owns] + input + svg": {
      transform: "rotate(180deg)",
    },
    "& + input + svg": {
      transition: "all 300ms linear",
    },
  },
  selectMenu: {
    "& > div > ul": {
      border: "0",
      padding: "5px 0",
      margin: "0",
      boxShadow: "none",
      minWidth: "100%",
      borderRadius: "4px",
      boxSizing: "border-box",
      display: "block",
      fontSize: "14px",
      textAlign: "left",
      listStyle: "none",
      backgroundColor: whiteColor,
      backgroundClip: "padding-box",
    },
    "& $selectPaper $selectMenuItemSelectedMultiple": {
      backgroundColor: "inherit",
    },
  },
});

export default function StyledSelect({
  value,
  onChange,
  children,
  inputProps,
}) {
  const classes = useStyles();

  return (
    <Select
      MenuProps={{
        className: classes.selectMenu,
      }}
      classes={{
        select: classes.select,
      }}
      value={value}
      onChange={onChange}
      inputProps={inputProps}
    >
      {children}
    </Select>
  );
}

StyledSelect.defaultProps = {
  value: "",
  onChange: () => {},
  inputProps: {
    name: "",
    id: "",
    disabled: false,
  },
};

StyledSelect.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  inputProps: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    disabled: PropTypes.bool,
    autoComplete: PropTypes.string,
  }),
};
