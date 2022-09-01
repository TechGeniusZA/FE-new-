import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { AdminMenu } from "./Admin/AdminMenu";
import { StandardMenu } from "./Standard/StandardMenu";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function NestedList() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const [selected, setSelected] = React.useState(true);

  const handleOpen = (label) => {
    setOpen(open === label ? "" : label);
  };
  const handleSelected = (label) => {
    setSelected(label);
  };

  return (
    <>
      {/**Standard List */}
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {StandardMenu.map((parent, parentIndex) => {
          return (
            <div key={parent.label}>
              <ListItemButton onClick={() => handleOpen(parent.label)}>
                {/* Icons if you need them <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon> */}
                <ListItemText primary={parent.label} />
                {open === parent.label ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open === parent.label} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {parent.children.map((child, childIndex) => {
                    return (
                      <ListItemButton
                        key={child.label}
                        selected={selected === parent.label + child.label}
                        sx={{ pl: 4 }}
                        onClick={() => {
                          setSelected(parent.label + child.label);
                          // Pass
                          navigate(child.route);
                        }}
                      >
                        {/* Icons if you need them <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon> */}
                        <ListItemText primary={child.label} />
                      </ListItemButton>
                    );
                  })}
                </List>
              </Collapse>
            </div>
          );
        })}
      </List>

      {/**Admin list  */}
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="admin-list-subheader"
        subheader={
          <ListSubheader component="div" id="admin-list-subheader">
            Admin Menu
          </ListSubheader>
        }
      >
        <Divider variant="middle" />
        {AdminMenu.map((parent, parentIndex) => {
          return (
            <div key={parent.label}>
              <ListItemButton onClick={() => handleOpen(parent.label)}>
                {/* Icons if you need them <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon> */}
                <ListItemText primary={parent.label} />
                {open === parent.label ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open === parent.label} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {parent.children.map((child, childIndex) => {
                    return (
                      <ListItemButton
                        key={child.label}
                        selected={selected === parent.label + child.label}
                        sx={{ pl: 4 }}
                        onClick={() => {
                          setSelected(parent.label + child.label);
                          navigate(child.route);
                        }}
                      >
                        {/* Icons if you need them <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon> */}
                        <ListItemText primary={child.label} />
                      </ListItemButton>
                    );
                  })}
                </List>
              </Collapse>
            </div>
          );
        })}
      </List>
    </>
  );
}
