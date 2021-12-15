import React from "react";
import PropTypes from "prop-types";

// organisms
import Table from "components/Table/Table.js";

// styles
import { makeStyles } from "@material-ui/core";
import { grayColor } from "assets/jss/material-kit-pro-react.js";
const useStyles = makeStyles({
  textCenter: {
    textAlign: "center",
  },
  description: {
    maxWidth: "150px",
  },
  textRight: {
    textAlign: "right",
  },
  tdName: {
    minWidth: "200px",
    fontWeight: "400",
    fontSize: "1.5em",
  },
  customFont: {
    fontSize: "16px !important",
  },
  tdNameAnchor: {
    color: grayColor[1],
  },
  tdNumberAndButtonGroup: {
    lineHeight: "1 !important",
    "& svg,& .fab,& .fas,& .far,& .fal,& .material-icons": {
      marginRight: "0",
    },
  },
});

export default function ProductTable({ tableHead, tableData }) {
  const classes = useStyles();
  return (
    <Table
      tableHead={tableHead}
      tableData={tableData}
      tableShopping
      customHeadCellClasses={[
        classes.textCenter,
        classes.description,
        classes.description,
        classes.description,
        classes.description,
        classes.description,
      ]}
      customHeadClassesForCells={[0, 2, 3, 4, 5, 6]}
      customCellClasses={[
        classes.tdName,
        classes.customFont,
        classes.customFont,
        classes.tdNumber,
        classes.tdNumber + " " + classes.tdNumberAndButtonGroup,
        classes.tdNumber + " " + classes.textCenter,
      ]}
      customClassesForCells={[1, 2, 3, 4, 5, 6]}
    />
  );
}

ProductTable.defaultProps = {
  tableHead: [],
  tableData: [],
};

ProductTable.propTypes = {
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.array, PropTypes.object])
  ),
  // 추후 타입 구체화
};
