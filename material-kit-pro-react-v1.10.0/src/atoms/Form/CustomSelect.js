import React from "react";
import PropTypes from "prop-types";

// atoms
import SelectFormControl from "./SelectFormControl";
import StyledSelect from "./StyledSelect";

// styles
import { makeStyles } from "@material-ui/styles";
import {
  primaryColor,
  primaryBoxShadow,
  whiteColor,
  grayColor,
} from "assets/jss/material-kit-pro-react.js";
import { MenuItem } from "@material-ui/core";

const useStyles = makeStyles({
  selectMenuItem: {
    fontSize: "13px",
    padding: "10px 20px",
    margin: "0 5px",
    borderRadius: "2px",
    transition: "all 150ms linear",
    display: "block",
    clear: "both",
    fontWeight: "400",
    lineHeight: "2",
    whiteSpace: "nowrap",
    color: grayColor[8],
    paddingRight: "30px",
    "&:hover": {
      backgroundColor: primaryColor[0],
      color: whiteColor,
      ...primaryBoxShadow,
    },
  },
  selectMenuItemSelected: {
    backgroundColor: primaryColor[0] + "!important",
    color: whiteColor,
  },
});

export default function CustomSelect({ selectProps, options }) {
  const classes = useStyles();
  return (
    <SelectFormControl>
      <StyledSelect {...selectProps}>
        {/* MenuItem을 StyledMenuItem으로 만들었을 때 ref 에러 발생*/}
        {options.map((option) => (
          <MenuItem
            key={option}
            value={option}
            classes={{
              root: classes.selectMenuItem,
              selected: classes.selectMenuItemSelected,
            }}
          >
            {option}
          </MenuItem>
        ))}
      </StyledSelect>
    </SelectFormControl>
  );
}

CustomSelect.defaultProps = {
  options: [],
};

CustomSelect.propTypes = {
  selectProps: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func,
    inputProps: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
      autoComplete: PropTypes.string,
      disabled: PropTypes.bool,
    }),
  }),
  options: PropTypes.array,
  // id, value가 모두 필요할 수도 있을 것 같은데...
  // 일단은 그냥 array로
};
