import React from "react";
import Footer from "components/Footer/Footer";
import { customFooterStyle } from "customs/assets/styles";
import { makeStyles } from "@material-ui/styles";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { Link } from "react-router-dom";

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
    >
      <GridContainer>
        <GridItem xs={12} sm={4} md={4}>
          <ul className={classes.linksVertical}>
            <li>
              <h6>법인명 : 함께쓰는 우산 장애인 보호작업장</h6>
            </li>
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
              <h6>전화 : 031-342-1030</h6>
            </li>
            <li>
              <h6>통신판매번호 : 제 2021-경기의왕-0703 호</h6>
            </li>
          </ul>
        </GridItem>
        <GridItem xs={12} sm={4} md={4}>
          <ul className={classes.linksVertical}>
            <Link to="/document/guide" className={classes.documentLink}>
              <li>
                <h6>이용안내</h6>
              </li>
            </Link>
            <Link
              to="/document/terms-and-conditions"
              className={classes.documentLink}
            >
              <li>
                <h6>이용약관</h6>
              </li>
            </Link>
            <Link
              to="/document/privacy-policy"
              className={classes.documentLink}
            >
              <li>
                <h6>개인정보처리방침</h6>
              </li>
            </Link>
            <li>
              <h6
                style={{
                  textTransform: "none",
                }}
              >
                개인정보관리책임자 : 이인우(boutime2017@gmail.com)
              </h6>
            </li>
          </ul>
        </GridItem>
      </GridContainer>
    </Footer>
  );
}
