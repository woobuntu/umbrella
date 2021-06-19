import React from "react";
import { GridList, GridListTile, GridListTileBar } from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { introduction_images } from "../dummy";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const Introduction = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <GridList cellHeight={180} cols={2}>
        {/* 모바일에서는 cols=1, 이외에는 2 */}
        {introduction_images.map(({ path, alt }) => (
          <GridListTile key={path}>
            <img src={path} alt={alt} style={{ objectFit: "contain" }} />
            <GridListTileBar title={alt} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default Introduction;
