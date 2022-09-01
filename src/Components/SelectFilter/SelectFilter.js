import { MenuItem, TextField, AccordionDetails,Accordion,AccordionSummary,Typography} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import {ExpandMoreIcon} from '@mui/icons-material'
function SelectFilter({ updateFilterText,formData }) {

  const [shopData, setShopData] = useState([])
  const [splitData, setSplitData] = useState([])
  async function fetchDataShop(){
    const res =await fetch(
      "/ShopGroupings",
      {
        method:'GET'
      }
    );
    const dataShop = await res.json();

    setShopData(dataShop)
    // setShopData(dataShop.displayName)
  }
  useEffect(()=> {
    fetchDataShop()

  })
 

  async function fetchShopSplits(){
    const res = await fetch(
      '/ShopSplits',
      {
        method:'GET'
      }
    );
    const shopSplits = await res.json();
    setSplitData(shopSplits)
  }
  fetchShopSplits()


  return (
    <Accordion>
      <AccordionSummary
       // expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Filters</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          select
          fullWidth
            name="filters.Active"
          label="Active Status"
          id={"Active"}
          value={formData.values.filters.Active}
          onChange={formData.handleChange}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value={true}>Active</MenuItem>
          <MenuItem value={false}>Inactive</MenuItem>
        </TextField>

        <TextField
          select
          fullWidth
            name="selector"
          label="selector"
          id={"selector"}
          value={formData.values.filters.selector}
          onChange={formData.handleChange}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="GLOBAL">GLOBAL</MenuItem>
          <MenuItem value="SHOPGROUPING">SHOPGROUPING</MenuItem>
          <MenuItem value="SHOPSPLIT">SHOPSPLIT</MenuItem>
        </TextField>

       {formData.values.selector ==="SHOPGROUPING" && <TextField
          select
          fullWidth
            name="filters.level"
          label="Shopgrouping"
          id={"level"}
          value={formData.values.filters.level}
          onChange={formData.handleChange}
        >
        <MenuItem value="All">All</MenuItem>
            {shopData.map( shop => (  
              <MenuItem key={shop.key} value={shop.DisplayName}>{shop.DisplayName}</MenuItem>
            ))

            }
      
        </TextField>}
        {formData.values.selector ==="SHOPSPLIT" && <TextField
          select
          fullWidth
            name="filters.level"
          label="Shopgrouping"
          id={"level"}
          value={formData.values.filters.level}
          onChange={formData.handleChange}
        >
        <MenuItem value="All">All</MenuItem>
            {splitData.map( split => (  
              <MenuItem key={split.key} value={split.DisplayName}>{split.DisplayName}</MenuItem>
            ))

            }
            
        </TextField>}
        
      </AccordionDetails>
    </Accordion>
  );
}

export default SelectFilter;
