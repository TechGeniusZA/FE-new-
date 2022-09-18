import CustomAccordian from "../../../../Components/Accordian/CustomAccordian";
import { MenuItem, TextFieldTypography, TextField, Grid } from "@mui/material";
import React from "react";
import axios from "axios";
import { ExpandMoreIcon } from "@mui/icons-material";

import { useState, useEffect } from "react";

function PacksizeFilter({formData}){
    const[data, setData] = useState([])
    async function fetchPurchase(){
        const res = await axios.get("/Inventory/GetSKUCategoriesTree?ActiveStatus=1")
        const purchaseData = await res.data
        console.log(purchaseData.data)
        setData(purchaseData.data)
    }
    useEffect(() => {
        fetchPurchase();
      }, []);
    

    return(
        <CustomAccordian>
        <TextField
        select
        size="small"
        fullWidth
        name="filters.Type"
        label="Type"
        id={"Type"}
        value={formData.values.filters.PurchaseCategory}
        onChange={formData.handleChange}
      >
        <MenuItem value="0">All</MenuItem>
        {data?.map((purchaseFilter)=>(
                    <MenuItem key ={purchaseFilter.parentCategoryID} value ={purchaseFilter.parentCategoryID}>{purchaseFilter.displayName}</MenuItem>
        ))}

      </TextField>
      <TextField
                autoFocus
                margin="dense"
                id="DisplayName"
                label="SKU"
                type="name"
                fullWidth
                variant="standard"
                defaultValue={formData.values.filters.SKU}
                onChange={formData.handleChange}
              />


        </CustomAccordian>

    )
}
export default PacksizeFilter