import React from "react";
import { Drawer } from "@material-ui/core";
import { TreeView, TreeItem } from "@material-ui/lab";
import { ExpandMore, ChevronRight } from "@material-ui/icons";
import { navigation_menu } from "../dummy";

const NavigationDrawer = () => {
  return (
    <Drawer variant="temporary" anchor="left" open>
      <TreeView
        defaultExpanded={navigation_menu.map(({ nodeId }) => nodeId)}
        defaultCollapseIcon={<ExpandMore />}
        defaultExpandIcon={<ChevronRight />}
      >
        {navigation_menu.map(({ nodeId, label, children }) => (
          <TreeItem nodeId={nodeId} label={label}>
            {children.map(({ nodeId: childNodeId, label: childLabel }) => (
              <TreeItem nodeId={childNodeId} label={childLabel} />
            ))}
          </TreeItem>
        ))}
      </TreeView>
    </Drawer>
  );
};

export default NavigationDrawer;
