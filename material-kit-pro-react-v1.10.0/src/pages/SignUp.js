import React, { useState, useEffect } from "react";
import { signUpStyle } from "customs/assets/styles";
import { makeStyles } from "@material-ui/styles";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";
import { KakaoButton } from "customs/components";
import { TermsAndConditions } from "customs/components/signup";
import { PrivacyPolicy } from "customs/components/signup";

const useStyles = makeStyles(signUpStyle);

export default function SingUp() {
  const [privacyPolicyChecked, setPrivacyPolicyChecked] = useState(false);
  const [termsAndConditionsChecked, setTermsAndConditionsChecked] =
    useState(false);
  const classes = useStyles();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }, []);

  const backgroundUrl =
    "https://woobuntu-umbrella.s3.ap-northeast-2.amazonaws.com/%E1%84%92%E1%85%A1%E1%86%B7%E1%84%81%E1%85%A6%E1%84%8A%E1%85%B3%E1%84%82%E1%85%B3%E1%86%AB%E1%84%8B%E1%85%AE%E1%84%89%E1%85%A1%E1%86%AB.jpg";
  return (
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
          <GridItem xs={12} sm={10} md={10}>
            <Card
              className={classes.cardSignup}
              style={{ backgroundColor: "aliceblue" }}
            >
              <h2 className={classes.cardTitle}>회원가입</h2>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={5} md={5}>
                    <TermsAndConditions
                      checked={termsAndConditionsChecked}
                      onChecked={setTermsAndConditionsChecked}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={5} md={5}>
                    <PrivacyPolicy
                      checked={privacyPolicyChecked}
                      onChecked={setPrivacyPolicyChecked}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  <KakaoButton
                    disabled={
                      !privacyPolicyChecked || !termsAndConditionsChecked
                    }
                  />
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
