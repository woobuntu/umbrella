import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { isMobile } from "../utils";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {"Copyright © "}
      <Link color="inherit" href="/">
        함께쓰는우산
      </Link>{" "}
      {new Date().getFullYear()}
      {/* {"."} */}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
  container: {
    display: "flex",
    justifyContent: "space-evenly",
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm" className={classes.container}>
        {!isMobile() && (
          <Typography variant="body2" color="textSecondary">
            <Link color="textSecondary" href="/contact">
              Contact-us
            </Link>
          </Typography>
        )}
        <Copyright />
        {!isMobile() && (
          <Typography variant="body2" color="textSecondary">
            <Link color="textSecondary" href="/introduction">
              사업소개
            </Link>
          </Typography>
        )}
      </Container>
    </footer>
  );
}
