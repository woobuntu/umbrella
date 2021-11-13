import React, { useEffect, useRef } from "react";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";

import { signInStyle } from "customs/assets/styles";
import { makeStyles } from "@material-ui/core/styles";
import { NaverButton, KakaoButton } from "customs/components";
import { useHistory } from "react-router";

const useStyles = makeStyles(signInStyle);

export default function SignIn() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const backgroundUrl =
    "https://woobuntu-umbrella.s3.ap-northeast-2.amazonaws.com/%E1%84%92%E1%85%A1%E1%86%B7%E1%84%81%E1%85%A6%E1%84%8A%E1%85%B3%E1%84%82%E1%85%B3%E1%86%AB%E1%84%8B%E1%85%AE%E1%84%89%E1%85%A1%E1%86%AB.jpg";
  const classes = useStyles();

  let history = useHistory();
  const googleButton = useRef();

  useEffect(() => {
    const {
      google: {
        accounts: {
          id: { initialize, renderButton },
        },
      },
    } = window;
    initialize({
      client_id:
        "971891934929-i0u5uk4c0hskeoj78kus93bokjbtddkc.apps.googleusercontent.com",
      callback: ({ credential }) => {
        history.push(`/?platform=google&code=${credential}`);
      },
    });
    renderButton(googleButton.current, { theme: "outline", size: "large" });
  }, []);
  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + backgroundUrl + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card>
                <form className={classes.form}>
                  <CardHeader
                    color="primary"
                    signup
                    className={classes.cardHeader}
                  >
                    <h4>로그인</h4>
                  </CardHeader>
                  <CardBody>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <NaverButton />
                      <KakaoButton />
                      <div ref={googleButton} />
                    </div>
                  </CardBody>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
