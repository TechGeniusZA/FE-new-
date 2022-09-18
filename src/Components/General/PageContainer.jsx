import React from "react";
import { Grid } from "@mui/material";
function PageContainer({ children }) {
  return (
 
    <Grid container rowSpacing={2} >
      {children}
    </Grid>
   
  );
}

export default PageContainer;