import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import React from "react";
import { termsAndConditions } from "documents";
import CardFooter from "components/Card/CardFooter";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import Check from "@material-ui/icons/Check";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import customCheckboxRadioSwitchStyle from "assets/jss/material-kit-pro-react/customCheckboxRadioSwitchStyle.js";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  ...customCheckboxRadioSwitchStyle,
});

export default function TermsAndConditions({ checked, onChecked }) {
  const classes = useStyles();
  const switchListStyleType = (type) => {
    let listStyleType = "";

    switch (type) {
      case "depth1":
        listStyleType = "decimal";
        break;
      case "depth2":
        listStyleType = "hangul-consonant";
        break;
      case "depth3":
        listStyleType = "circle";
        break;
      case "depth4":
        listStyleType = "square";
        break;
      case "comment":
        listStyleType = "disclosure-closed";
        break;
      default:
        listStyleType = "none";
        break;
    }

    return listStyleType;
  };
  return (
    <Card pricing>
      <CardBody style={{ height: "23rem", overflow: "scroll" }}>
        {termsAndConditions.map(({ title, contents }, index) => (
          <ul key={index}>
            <h5>{title}</h5>
            {(function recursion(contents) {
              return contents.map(
                ({ type, text, contents: innerContents }, index) => (
                  <li
                    key={index}
                    style={{
                      listStyleType: switchListStyleType(type),
                      marginBottom: "2rem",
                    }}
                  >
                    <p style={{ marginBottom: 0 }}>{text}</p>
                    {innerContents && <ul>{recursion(innerContents)}</ul>}
                  </li>
                )
              );
            })(contents)}
          </ul>
        ))}
      </CardBody>
      <CardFooter>
        <FormControlLabel
          classes={{
            label: classes.label,
          }}
          control={
            <Checkbox
              checked={checked}
              onChange={() => onChecked(!checked)}
              checkedIcon={<Check className={classes.checkedIcon} />}
              icon={<Check className={classes.uncheckedIcon} />}
              classes={{
                checked: classes.checked,
                root: classes.checkRoot,
              }}
            />
          }
          label={
            <span>
              <Link to="/document/terms-and-conditions">이용약관</Link>에
              동의합니다.
            </span>
          }
        />
      </CardFooter>
    </Card>
  );
}

TermsAndConditions.propTypes = {
  checked: PropTypes.bool,
  onChecked: PropTypes.func,
};
