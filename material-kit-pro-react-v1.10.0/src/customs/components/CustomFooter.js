import React from "react";
import Footer from "components/Footer/Footer";
import { customFooterStyle } from "customs/styles";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(customFooterStyle);

export default function CustomFooter() {
  const classes = useStyles();
  return (
    <Footer
      content={
        <div>
          <div className={classes.right}>
            Copyright &copy; 함께쓰는우산 {1900 + new Date().getYear()}
          </div>
        </div>
      }
    />
  );
}
