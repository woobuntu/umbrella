import React from "react";
import { TreeView, TreeItem } from "@material-ui/lab";
import { organizational_chart } from "../dummy";
import { BiTask, BiGroup } from "react-icons/bi";
import { FcDepartment } from "react-icons/fc";
import { GrUserAdmin } from "react-icons/gr";

interface TreeItemInterface {
  id: string;
  name: string;
  type: string;
  children?: this[];
}

const extractDefaultExpanded = (tree: TreeItemInterface[]) => {
  const listOfIds: string[] = [];

  const recursive = ({ id, children }: TreeItemInterface) => {
    if (children) {
      listOfIds.push(id);
      children?.forEach(recursive);
    }
  };
  organizational_chart.forEach(recursive);
  return listOfIds;
};

const determineIcon = (type: string) => {
  switch (type) {
    case "group":
      return <BiGroup />;
    case "executive":
      return <GrUserAdmin />;
    case "department":
      return <FcDepartment />;
    case "task":
      return <BiTask />;
  }
};

const recursiveExpand = ({ id, name, type, children }: TreeItemInterface) => (
  <TreeItem key={id} nodeId={id} label={name} icon={determineIcon(type)}>
    {children?.map(recursiveExpand)}
  </TreeItem>
);

const OrganizationalChart = () => {
  return (
    <TreeView defaultExpanded={extractDefaultExpanded(organizational_chart)}>
      {organizational_chart.map(recursiveExpand)}
    </TreeView>
  );
};

export default OrganizationalChart;
