import React from "react";
import GridItem from "components/Grid/GridItem";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import { optionStyle } from "customs/assets/styles/product";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles(optionStyle);

export default function Option({ value, options, selectOption }) {
  const classes = useStyles();

  return (
    <GridItem md={6} sm={6}>
      <label>옵션</label>
      <FormControl fullWidth className={classes.selectFormControl}>
        {value && (
          <Select
            value={value}
            onChange={selectOption}
            inputProps={{
              name: "optionSelect",
              id: "option-select",
            }}
          >
            {options.map(({ id, name }) => (
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
            ))}
          </Select>
        )}
      </FormControl>
    </GridItem>
  );
}

Option.propTypes = {
  value: PropTypes.number,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
  selectOption: PropTypes.func,
};
