import React from "react";
import Table from "components/Table/Table.js";
import PropTypes from "prop-types";
import { cartStyle } from "customs/assets/styles/basket";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(cartStyle);

export default function Cart({ tableHead, tableData }) {
  const classes = useStyles();
  return (
    <Table
      tableHead={tableHead}
      tableData={tableData}
      tableShopping
      customCellClasses={[classes.tdName, classes.customFont]}
      customClassesForCells={[1, 2]}
    />
  );
}

Cart.propTypes = {
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.array,
};
