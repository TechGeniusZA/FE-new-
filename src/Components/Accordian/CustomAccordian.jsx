import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {TextField, MenuItem, Accordion, AccordionDetails, Typography, AccordionSummary, Grid } from "@mui/material"


const CustomAccordian = ({children,data = null}) => {


   return <Grid item xs={12}>
    <div style={{
      padding:"5px",
      backgroundColor:"white",
      borderRadius: "10px",
      border: "none",
      boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
    }}>
   <Accordion  >
     <AccordionSummary 
     
       expandIcon={<ExpandMoreIcon />}
       aria-controls="panel1a-content"
       id="panel1a-header"
     >
      <div style={{display:"flex",columnGap:10,alignItems:"center"}}> <Typography>Filters : </Typography> {"" }</div>
     </AccordionSummary>
     <AccordionDetails  >
       <Grid container rowSpacing={3}>
         {children}
       </Grid>
     </AccordionDetails>
   </Accordion>
   </div>
 </Grid>

}
export default CustomAccordian