import { MenuItem, TextFieldTypography, TextField, Grid } from "@mui/material";
import React from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Accordion, AccordionDetails, Typography, AccordionSummary } from "@mui/material"
import CustomAccordian from "../../../../Components/Accordian/CustomAccordian";

function CategoryFilter({ formData }) {

  return (
    <CustomAccordian>
     
    <Grid item xs={12}>
        <TextField
        select
        size="small"
        fullWidth
        name="filters.Active"
        label="Active Status"
        id={"Active"}
        value={formData.values.filters.Active}
        onChange={formData.handleChange}
      >
        <MenuItem value="0">All</MenuItem>
        <MenuItem value={"1"}>Active</MenuItem>
        <MenuItem value={"2"}>Inactive</MenuItem>
      </TextField> </Grid>
  
  
        </CustomAccordian>

  );
}

export default CategoryFilter;