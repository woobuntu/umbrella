import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { isLoadingVar } from "graphql/state";

export default function useUpsertBlog() {
  const { pathname } = useLocation();
  const Action = pathname.includes("edit") ? "Update" : "Create";
  const action = Action.toLowerCase();
  const Target = pathname.includes("performances")
    ? "Performance"
    : "Notification";
  const target = Target.toLowerCase();
  const history = useHistory();

  return ({ id, files, title, content, timestamp, deletedFiles }) => {
    const formData = new FormData();

    const countOfFiles = new Array(files.length).fill("null").join(", ");
    const createOperations = `{ "query": "mutation Create${Target}($create${Target}Input: Create${Target}Input!) {  create${Target}(create${Target}Input: $create${Target}Input){ id  title  content  timestamp  }  }",  "variables": {  "create${Target}Input": {  "title": "${title}",  "content": ${JSON.stringify(
      content
    )}, "timestamp": "${timestamp}", "files": [${countOfFiles}] } } }`;

    const updateOperations = `{ "query": "mutation Update${Target}($update${Target}Input: Update${Target}Input!) {  update${Target}(update${Target}Input: $update${Target}Input){ id title content timestamp }}", "variables":{"update${Target}Input":{"id":${id},"title": "${title}","content": ${JSON.stringify(
      content
    )}, "timestamp": "${timestamp}", "files": [${countOfFiles}],"deletedFiles":[${deletedFiles.join(
      ", "
    )}]}}}`;
    const operations =
      Action === "Create" ? createOperations : updateOperations;
    // content를 두번 JSON.stringify시키면 되는구나;;

    formData.append("operations", operations);

    const filesMap = [];
    for (let index = 0; index < files.length; index++) {
      filesMap.push(
        `"${index}":["variables.${action}${Target}Input.files.${index}"]`
      );
    }

    const map = `{${filesMap.join(",")}}`;
    formData.append("map", map);

    let index = 0;
    if (files.length) {
      for (const file of files) {
        formData.append(`${index}`, file);
        index++;
      }
    }
    if (deletedFiles.length) {
      for (const file of deletedFiles) {
        formData.append(`${index}`, file);
        index++;
      }
    }

    isLoadingVar(true);

    axios({
      url: process.env.REACT_APP_API_URL,
      method: "POST",
      headers: {
        ["Content-Type"]: "multipart/form-data",
      },
      data: formData,
      withCredentials: true,
    })
      .then((data) => {
        isLoadingVar(false);
        history.push(`/${target}s`);
      })
      .catch((error) => {
        isLoadingVar(false);
        alert(error);
      });
  };
}
