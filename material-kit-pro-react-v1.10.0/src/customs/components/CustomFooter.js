import React from "react";
import Footer from "components/Footer/Footer";
import { customFooterStyle } from "customs/assets/styles";
import { makeStyles } from "@material-ui/styles";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { Link } from "react-router-dom";
import CustomDropdown from "components/CustomDropdown/CustomDropdown";
import { Typography } from "@material-ui/core";

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
                <h6 style={{ fontWeight: "bold", color: "#ff8e77" }}>
                  개인정보처리방침
                </h6>
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
        <GridItem xs={12} sm={4} md={4}>
          <CustomDropdown
            buttonText="패밀리 사이트"
            buttonProps={{
              round: true,
              block: true,
              color: "info",
            }}
            dropPlacement="bottom"
            dropdownList={[
              "의왕시",
              "경기도",
              "보건복지부",
              "한국장애인개발원",
              "장애인고용공단",
              "장애인복지관협회",
              "장애인복지시설협회",
              "직업재활시설협회",
              "장애인재활상담협회",
              "국세청",
              "국민권익위원회",
            ]}
            onClick={(name) => {
              let url;
              switch (name) {
                case "의왕시":
                  url =
                    "https://www.uiwang.go.kr/humanframe/theme/uiwang/html/temp/index4.html";
                  break;
                case "경기도":
                  url = "https://www.gg.go.kr/";
                  break;
                case "보건복지부":
                  url = "http://www.mohw.go.kr/react/index.jsp";
                  break;
                case "한국장애인개발원":
                  url = "https://www.koddi.or.kr/";
                  break;
                case "장애인고용공단":
                  url = "https://www.kead.or.kr/";
                  break;
                case "장애인복지관협회":
                  url = "http://www.ggwelfare.or.kr/";
                  break;
                case "장애인복지시설협회":
                  url = "http://www.gaid.or.kr/";
                  break;
                case "장애인재활시설협회":
                  url = "http://www.gavrd.kr/";
                  break;
                case "장애인재활상담협회":
                  url = "http://www.karc.kr/";
                  break;
                case "국세청":
                  url = "https://www.nts.go.kr/nts/main.do";
                  break;
                case "국민권익위원회":
                  url = "https://www.acrc.go.kr/";
                  break;
              }
              window.open(url);
            }}
          />
        </GridItem>
      </GridContainer>
    </Footer>
  );
}
