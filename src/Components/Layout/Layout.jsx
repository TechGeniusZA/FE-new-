import Drawer from "./Drawer";

import React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Typography,
} from "@mui/material";
import Footer from "./Footer";
function Layout({children}) {
  return (
    <Drawer>
      {children}
      <Footer />
    </Drawer>
  );
  {
    /*  */
  }
}

export default Layout;
