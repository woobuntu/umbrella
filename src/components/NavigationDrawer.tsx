import React from "react";
import { Drawer } from "@material-ui/core";
import { TreeView, TreeItem } from "@material-ui/lab";
import { ExpandMore, ChevronRight } from "@material-ui/icons";
import { navigation_menu } from "../dummy";
import { useHistory } from "react-router-dom";

interface propsFunction {
  closeDrawer: () => void;
}

interface pushToParams {
  category: string;
  destination: string;
}

const NavigationDrawer = ({ closeDrawer }: propsFunction) => {
  const history = useHistory();
  const pushTo = ({ category, destination }: pushToParams) => {
    history.push(`/${category}/${destination}`);
    closeDrawer();
  };
  return (
    <Drawer variant="temporary" anchor="left" onClose={closeDrawer} open>
      <TreeView
        defaultExpanded={navigation_menu.map(({ nodeId }) => nodeId)}
        defaultCollapseIcon={<ExpandMore />}
        defaultExpandIcon={<ChevronRight />}
      >
        {navigation_menu.map(({ nodeId, label, children, link }) => (
          <TreeItem key={nodeId} nodeId={nodeId} label={label}>
            {children.map(
              ({ nodeId: childNodeId, label: childLabel, link: childLink }) => (
                <TreeItem
                  key={childNodeId}
                  nodeId={childNodeId}
                  label={childLabel}
                  onClick={() =>
                    pushTo({ category: link, destination: childLink })
                  }
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
