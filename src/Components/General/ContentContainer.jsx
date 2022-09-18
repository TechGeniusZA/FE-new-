import { Grid, Container } from "@mui/material";
import React, { Children } from "react";

function ContentContainer({ children }) {
  return (
    <Grid item xs={12}>
      
        <Grid container rowGap={2} sx={{width:"100%", backgroundColor :"white", padding:"15px 15px 15px 15px",  boxShadow: "1px 1px 1px 1px #cccccc", borderRadius:2}}>
          {children}
        </Grid>
   
    </Grid>
  );
}

export default ContentContainer;
