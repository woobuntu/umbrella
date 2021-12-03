import React, { useState } from "react";
import { customSelectStyle } from "../../assets/styles/order";
import { makeStyles } from "@material-ui/styles";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles(customSelectStyle);

export default function CustomSelect({ options, state, action, disabled }) {
  const classes = useStyles();

  return (
    <FormControl fullWidth className={classes.formControl}>
      <Select
        MenuProps={{
          className: classes.selectMenu,
        }}
        classes={{
          select: classes.select,
        }}
        value={state}
        onChange={action}
        inputProps={{
          name: "simpleSelect",
          id: "simple-select",
          disabled,
        }}
      >
        {options.map((option) => (
          <MenuItem
            classes={{
              root: classes.selectMenuItem,
              selected: classes.selectMenuItemSelected,
            }}
            value={option}
            key={option}
          >
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

CustomSelect.propTypes = {
  options: PropTypes.array,
  state: PropTypes.string,
  action: PropTypes.func,
  disabled: PropTypes.bool,
};
