import React from "react";
import { Drawer } from "@material-ui/core";
import { TreeView, TreeItem } from "@material-ui/lab";
import { ExpandMore, ChevronRight } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

interface childrenProps {
  nodeId: string;
  label: string;
  link: string;
}

interface propsFunction {
  closeDrawer: () => void;
  navigationTree: {
    nodeId: string;
    label: string;
    children: childrenProps[];
  }[];
}

// interface pushToParams {
//   category: string;
//   destination: string;
// }

const NavigationDrawer = ({ closeDrawer, navigationTree }: propsFunction) => {
  const history = useHistory();
  const pushTo = (destination: string) => {
    history.push(`/${destination}`);
    closeDrawer();
  };
  return (
    <Drawer variant="temporary" anchor="left" onClose={closeDrawer} open>
      <TreeView
        defaultExpanded={navigationTree.map(({ nodeId }) => nodeId)}
        defaultCollapseIcon={<ExpandMore />}
        defaultExpandIcon={<ChevronRight />}
      >
        {navigationTree.map(({ nodeId, label, children }) => (
          <TreeItem key={nodeId} nodeId={nodeId} label={label}>
            {children.map(
              ({ nodeId: childNodeId, label: childLabel, link }) => (
                <TreeItem
                  key={childNodeId}
                  nodeId={childNodeId}
                  label={childLabel}
                  onClick={() => pushTo(link)}
                />
              )
            )}
          </TreeItem>
        ))}
      </TreeView>
    </Drawer>
  );
};

export default NavigationDrawer;
