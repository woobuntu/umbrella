import React, { Fragment, useState, useEffect, useRef } from "react";
import { CentralWhitePage } from "atoms/Container";
import { makeStyles } from "@material-ui/styles";
import {
  grayColor,
  title,
  mlAuto,
  mrAuto,
  hexToRgb,
  blackColor,
} from "assets/jss/material-kit-pro-react.js";
import Quill from "quill";
import Datetime from "react-datetime";

import Button from "components/CustomButtons/Button";

import "quill/dist/quill.snow.css";
import CustomInput from "components/CustomInput/CustomInput";
import { useLocation } from "react-router-dom";
import ContainerWithZindex1 from "atoms/Container/ContainerWithZindex1";
import { BlogParallax } from "atoms/Parallax";
import { useBlogQuery, useUpsertBlog } from "hooks";
import CustomFileInput from "components/CustomFileInput/CustomFileInput";
import { AttachFile, ContactSupportOutlined, Layers } from "@material-ui/icons";
import AttachedFiles from "organisms/AttachedFiles";
import { FormControl, InputLabel } from "@material-ui/core";

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

export default function Blog() {
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

  const subject = location.pathname.split("/")[1];
  const key =
    subject === "performances"
      ? "performanceFileRelations"
      : "notificationFileRelations";
  const id = location.pathname.split("/")[3];

  const options = {
    theme: "snow",
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

  const [timestamp, setTimestamp] = useState(new Date());

  useEffect(() => {
    if (blogData) {
      setTitle(blogData.title);
      const parsedContent = JSON.parse(blogData.content);
      quillRef.current.__quill.editor.applyDelta(parsedContent);
      setTimestamp(new Date(blogData.timestamp));
    }
  }, [blogData]);

  const fileInputRef = useRef();

  const upsertBlog = useUpsertBlog();

  const [deletedFiles, setDeletedFiles] = useState({});
  const deleteFile = (fileId) =>
    setDeletedFiles({
      ...deletedFiles,
      [fileId]: true,
    });

  const files = !blogData
    ? []
    : blogData[key].filter(({ file: { id } }) => !deletedFiles[id]);

  const getQuillContent = () => {
    const quillContent = quillRef.current.__quill.getContents().ops;

    quillContent[quillContent.length - 1].insert = quillContent[
      quillContent.length - 1
    ].insert.replace(/(\n)+$/, "");

    return JSON.stringify(quillContent);
  };

  return (
    <Fragment>
      <BlogParallax />
      <CentralWhitePage>
        <ContainerWithZindex1>
          <div className={classes.section}>
            <InputLabel style={{ fontSize: "0.5rem" }}>일시</InputLabel>
            <FormControl>
              <Datetime
                dateFormat="YYYY-MM-DD"
                timeFormat={false}
                value={timestamp}
                onChange={(e) => {
                  setTimestamp(e._d.toDateString());
                }}
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
                onChange: ({ target: { value } }) => setTitle(value),
              }}
            />

            <div ref={quillRef} />
            <CustomFileInput
              multiple
              formControlProps={{
                fullWidth: true,
              }}
              ref={fileInputRef}
              inputProps={{
                placeholder: "복수의 파일을 첨부할 수 있습니다.",
              }}
              endButton={{
                buttonProps: {
                  round: true,
                  color: "primary",
                  justIcon: true,
                  fileButton: true,
                },
                icon: <AttachFile />,
              }}
            />
            <AttachedFiles files={files} action={deleteFile} />
            <Button
              onClick={() =>
                upsertBlog({
                  id,
                  files: fileInputRef.current.getFiles(),
                  title,
                  content: getQuillContent(),
                  timestamp,
                  deletedFiles: Object.keys(deletedFiles),
                })
              }
              style={{ float: "right" }}
              color="info"
            >
              저장하기
            </Button>
          </div>
        </ContainerWithZindex1>
      </CentralWhitePage>
    </Fragment>
  );
}
