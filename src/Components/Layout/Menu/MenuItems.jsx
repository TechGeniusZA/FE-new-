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
import { Divider, ListItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// Icon imports
import {Inventory} from '@mui/icons-material';
// Temp Color: Needs to be moved to provider
// #86C328 #ADAEB3
// Icon mapping. Use this object to map the icons
const icons = {
  Inventory : <Inventory sx={{color: "#444545"}} />
}
export default function NestedList({ drawerOpen, setDrawerState }) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const [selected, setSelected] = React.useState(true);

  const handleOpen = (label) => {
    // If the drawer is not open, open it when expanding menus
    !drawerOpen && setDrawerState(true);

    setOpen(open === label ? "" : label);
  };
  const handleSelected = (label) => {
    setSelected(label);
  };
  useEffect(() => {
    !drawerOpen && setOpen("");
  }, [drawerOpen]);
  return (
    <>
      {/**Standard List */}
      <List>
        {StandardMenu.map((parent, parentIndex) => {
          return (
            <ListItem
              key={parent.label}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: drawerOpen ? "initial" : "center",
                  px: 2.5,
                }}
                selected={ selected === parent.label}
                onClick={() => {
              
                  if( parent.children.length === 0){
                
                    setSelected(parent.label)
                  }
                
                  parent.children.length > 0
                    ? handleOpen(parent.label)
                    : navigate(parent.route);
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: drawerOpen ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
              {   icons[parent.iconName]   }
                 {/* <StarBorder  sx={{color: "#FC0"}} /> */}
                </ListItemIcon>
                <ListItemText
               
                  sx={{ opacity: drawerOpen ? 1 : 0 }}
                > <Typography>{parent.label}</Typography></ListItemText>
                {parent.children.length > 0 ? (
                  drawerOpen ? (
                    open === parent.label ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
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
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
