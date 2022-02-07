import SpaceBetween from "atoms/Container/SpaceBetween";
import { Title } from "atoms/Title";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import Success from "components/Typography/Success";
import React, { Fragment, useEffect, useState } from "react";
import Button from "components/CustomButtons/Button";
import { FlexRow } from "atoms/Container";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export default function AttachedFiles({ files, action }) {
  const [buttonText, setButtonText] = useState("다운로드");

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes("edit")) {
      setButtonText("삭제하기");
    }
  }, [pathname]);

  const onClick = pathname.includes("edit")
    ? (file) => action(file.id)
    : (file) => window.open(file.path);

  if (!files.length) return <Fragment />;

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={8} lg={8}>
        <Card raised>
          <CardBody>
            <Title size={6}>첨부파일</Title>
            {files.map(({ file }) => (
              <SpaceBetween key={file.id}>
                <span style={{ fontSize: "1rem" }}>{file.name}</span>
                <Button
                  color={pathname.includes("edit") ? "danger" : "success"}
                  onClick={() => onClick(file)}
                >
                  {buttonText}
                </Button>
              </SpaceBetween>
            ))}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

AttachedFiles.propTypes = {
  files: PropTypes.array,
  action: PropTypes.func,
};
