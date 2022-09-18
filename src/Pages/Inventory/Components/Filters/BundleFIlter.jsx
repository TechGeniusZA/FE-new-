import { MenuItem, TextFieldTypography, TextField, Grid } from "@mui/material";
import React from "react";
import { ExpandMoreIcon } from "@mui/icons-material";
import {Accordion, AccordionDetails, Typography, AccordionSummary } from "@mui/material"
import CustomAccordian from "../../../../Components/Accordian/CustomAccordian";

function BundleFilter({ formData }) {

  return (
    <CustomAccordian>

        <TextField
        select
        size="small"
        fullWidth
        name="filters.Active"
        label="Category"
        id={"Active"}
        value={formData.values.filters.Category}
        onChange={formData.handleChange}
      >
        <MenuItem value="0">All</MenuItem>

      </TextField> 
      <TextField
                autoFocus
                margin="dense"
                id="DisplayName"
                label="Main Sku"
                type="name"
                fullWidth
                variant="standard"
                defaultValue={formData.values.filters.MainSku}
                onChange={formData.handleChange}
              />
        <TextField
                autoFocus
                margin="dense"
                id="DisplayName"
                label="Main SKU Packsize"
                type="name"
                fullWidth
                variant="standard"
                defaultValue={formData.values.filters.MainPackSize}
                onChange={formData.handleChange}
              />

      </CustomAccordian>

  );
}

export default BundleFilter;
