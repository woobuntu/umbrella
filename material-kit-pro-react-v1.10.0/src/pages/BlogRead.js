import React, { Fragment, useState, useEffect, useRef } from "react";
import { CentralWhitePage } from "atoms/Container";
import { makeStyles } from "@material-ui/styles";
import {
  grayColor,
  title,
  mlAuto,
  mrAuto,
} from "assets/jss/material-kit-pro-react.js";
import Quill from "quill";

import Button from "components/CustomButtons/Button";

import "quill/dist/quill.bubble.css";
import "quill/dist/quill.snow.css";
import CustomInput from "components/CustomInput/CustomInput";
import { useLocation } from "react-router-dom";
import ContainerWithZindex1 from "atoms/Container/ContainerWithZindex1";
import { BlogParallax } from "atoms/Parallax";
import { useBlogQuery, useDeleteBlog } from "hooks";
import { useHistory } from "react-router-dom";
import { DeletePostModal } from "organisms";
import { useReactiveVar } from "@apollo/client";
import { isAuthenticatedVar } from "graphql/state";
import AttachedFiles from "organisms/AttachedFiles";
import { FormControl, InputLabel } from "@material-ui/core";
import Datetime from "react-datetime";
const useStyles = makeStyles({
  title,
  section: {
    backgroundPosition: "50%",
    backgroundSize: "cover",
    padding: "70px 5%",
    "& p": {
      fontSize: "1.188rem",
      lineHeight: "1.5em",
      color: grayColor[15],
      marginBottom: "30px",
    },
  },
  mlAuto,
  mrAuto,
});

export default function BlogRead() {
  const classes = useStyles();

  const quillRef = useRef();

  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    [{ direction: "rtl" }],
    ["bold", "italic", "strike", "underline"],
    ["code-block"],
    [{ size: [] }, { font: [] }],
    [{ color: [] }, { background: [] }],
    ["link"],
    ["blockquote"],
    ["image", "video"],
  ];

  const location = useLocation();

  const [_, subject, id] = location.pathname.split("/");

  const options = {
    theme: "bubble",
    modules: {
      toolbar: toolbarOptions,
    },
  };

  useEffect(() => {
    new Quill(quillRef.current, options);
  }, []);

  const [title, setTitle] = useState("");

  const blogData = useBlogQuery({
    subject,
    id: Number(id),
  });

  const files = !blogData
    ? []
    : subject === "performances"
    ? blogData.performanceFileRelations
    : blogData.notificationFileRelations;

  useEffect(() => {
    if (blogData) {
      setTitle(blogData.title);
      const parsedContent = JSON.parse(blogData.content);
      quillRef.current.__quill.editor.applyDelta(parsedContent);
      quillRef.current.__quill.enable(false);
    }
  }, [blogData]);

  const history = useHistory();
  const onClickEditButton = () => history.push(`/${subject}/edit/${id}`);

  const deleteBlog = useDeleteBlog();
  const onClickDeleteButton = () => deleteBlog(Number(id));

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onCloseModal = () => setIsModalOpen(false);

  const role = useReactiveVar(isAuthenticatedVar);

  return (
    <Fragment>
      <BlogParallax />
      <CentralWhitePage>
        <ContainerWithZindex1>
          <div className={classes.section}>
            <InputLabel style={{ fontSize: "0.5rem" }}>일시</InputLabel>
            <FormControl>
              <Datetime
                dateFormat="YYYY년 MM월 DD일"
                timeFormat={false}
                value={new Date(blogData?.timestamp)}
                open={false}
              />
            </FormControl>
            <CustomInput
              labelText="제목"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                id: "title",
                name: "title",
                autoComplete: "title",
                value: title,
                disabled: true,
              }}
            />
            <div ref={quillRef} />
            <AttachedFiles files={files} />
            {/* 이거 둘 다 관리자한테만 보이는 버튼이죠 */}
            {role === "admin" && (
              <Fragment>
                <Button
                  onClick={onClickEditButton}
                  style={{ float: "right" }}
                  color="primary"
                >
                  수정하기
                </Button>
                <Button
                  onClick={() => setIsModalOpen(true)}
                  style={{ float: "right" }}
                  color="danger"
                >
                  삭제하기
                </Button>
              </Fragment>
            )}
          </div>
        </ContainerWithZindex1>
      </CentralWhitePage>
      <DeletePostModal
        open={isModalOpen}
        onClose={onCloseModal}
        yesNoButtonsProps={{
          onClickYesButton: onClickDeleteButton,
          onClickNoButton: onCloseModal,
        }}
      />
    </Fragment>
  );
}
