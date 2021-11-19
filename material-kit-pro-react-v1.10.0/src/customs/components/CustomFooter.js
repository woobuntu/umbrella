import React from "react";
import Footer from "components/Footer/Footer";
import { customFooterStyle } from "customs/assets/styles";
import { makeStyles } from "@material-ui/styles";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

const useStyles = makeStyles(customFooterStyle);

export default function CustomFooter() {
  const classes = useStyles();
  return (
    <Footer
      // theme="dark"
      content={
        <div>
          <div className={classes.right}>
            Copyright &copy; 함께쓰는 우산 장애인 보호작업장{" "}
            {1900 + new Date().getYear()}
          </div>
        </div>
      }
    >
      <GridContainer>
        <GridItem>
          <ul className={classes.linksVertical}>
            <li>
              <h6>사업자등록번호 : 636-82-00353</h6>
            </li>
            <li>
              <h6>대표자 : 장윤경</h6>
            </li>
            <li>
              <h6>
                소재지 : 경기도 의왕시 갈미2로 30, 401호(내손동, 미광프라자)
              </h6>
            </li>
            <li>
              <h6>통신판매번호 :</h6>
            </li>
          </ul>
        </GridItem>
      </GridContainer>
    </Footer>
  );
}
