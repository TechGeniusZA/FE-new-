import React from "react";

import {TextField, MenuItem, Accordion, AccordionDetails, Typography, AccordionSummary, Grid } from "@mui/material"


const CustomAccordian = ({children}) => {
   return <Accordion>
        <AccordionSummary
         // expandIcon={<ExpandMoreIcon />}
         aria-controls="panel1a-content"
         id="panel1a-header">
        <Typography>Filters</Typography>
        </AccordionSummary>
            <AccordionDetails>
            <Grid container rowGap={2}>
            {children.map((child,index) => (
                <Grid key={index} item xs={12}>
               {child}
                </Grid>
            ))}
            </Grid>
            </AccordionDetails>
        
    </Accordion>

}
export default CustomAccordian