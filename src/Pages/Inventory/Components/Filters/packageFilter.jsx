import { MenuItem, TextFieldTypography, TextField, Grid } from "@mui/material";
import React from "react";
import {Accordion, AccordionDetails, Typography, AccordionSummary } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function PackageFilter({ formData }) {

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header">
      <Typography>Filters</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid>

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
      </TextField> 

        </Grid>
      
      </AccordionDetails>

      </Accordion>

  );
}

export default PackageFilter;
