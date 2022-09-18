import React from 'react'
import {TextField, MenuItem, Accordion, AccordionDetails, Typography, AccordionSummary, Grid } from "@mui/material"
import CustomAccordian from '../../../../Components/Accordian/CustomAccordian'

function SkuFilter({formData}) {
  return (
    <CustomAccordian>
      <Grid item xs={12}>
          <TextField
                autoFocus
                margin="dense"
                id="DisplayName"
                label="Display Name"
                type="name"
                fullWidth
                size='small'
                value={formData.values.filters.DisplayName}
                onChange={formData.handleChange}
              /></Grid>
   <Grid item xs={12}>
        <TextField
        size="small"
        select
        fullWidth
        name="filters.level"
        label="Purchase Category"
        id={"selector"}
        value={formData.values.filters.Product}
        onChange={formData.handleChange}
      >
        <MenuItem value="0">All</MenuItem>
        <MenuItem value="1">Product</MenuItem>
        <MenuItem value="2">Services</MenuItem>
      </TextField></Grid>

      {formData.values.filters.Product === 1 && (
        <>
          <Grid item xs={12}><TextField
                  size="small"
                  select
                  fullWidth
                  name="filters.shopID"
                  label={"Brand"}
                  id={"filters.shopID"}
                  value={formData.values.filters.Brand}
                  onChange={formData.handleChange}
              >
                  <MenuItem value={"0"}>All</MenuItem>
              </TextField></Grid>
              <Grid item xs={12}> <TextField
          size="small"
          select
          fullWidth
          name="filters.shopID"
          label={"Main/Sub"}
          id={"filters.shopID"}
          value={formData.values.filters.Main}
          onChange={formData.handleChange}
        >
          <MenuItem value={"0"}>All</MenuItem>
          <MenuItem value={"1"}>Main Only</MenuItem>
          <MenuItem value={"2"}>Sub Only</MenuItem>
        </TextField></Grid> 
        <Grid item xs={12}> 
              
              <TextField
                  size="small"
                  select
                  fullWidth
                  name="filters.shopID"
                  label={"Returnable"}
                  id={"filters.shopID"}
                  value={formData.values.filters.returnable}
                  onChange={formData.handleChange}
              >
                      <MenuItem value={"0"}>All</MenuItem>
                      <MenuItem value={"1"}>Returnable</MenuItem>
                    <MenuItem value={"2"}>Non Returnable</MenuItem>
                  </TextField></Grid> 
                  </>    
      )}
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
  )
}

export default SkuFilter