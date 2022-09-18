import { MenuItem, TextFieldTypography, TextField, Grid } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { ExpandMoreIcon } from "@mui/icons-material";
import CustomAccordian from "../../../../Components/Accordian/CustomAccordian";
function SelectFilter({ formData }) {
  const [shopData, setShopData] = useState([]);
  const [splitData, setSplitData] = useState([]);
  async function fetchDataShop() {
    const res = await fetch("/ShopGroupings", {
      method: "GET",
    });
    const dataShop = await res.json();
    console.log(dataShop);
    setShopData(dataShop);
    // setShopData(dataShop.displayName)
  }
  useEffect(() => {
    fetchDataShop();
  }, []);

  async function fetchShopSplits() {
    const res = await fetch("/ShopSplits", {
      method: "GET",
    });
    const shopSplits = await res.json();
    setSplitData(shopSplits);
  }
  fetchShopSplits();
//TODO 
// Pass the filternotes to the custom accordian
// data && Object.entries(data.values.filters).map(([key,value])=> <Typography sx={{fontSize:"13px",backgroundColor:"#3e9e43", color :"whitesmoke", padding:"5px", borderRadius:"2px 5px 2px 5px"}}>{key}</Typography>)
  return (
    <CustomAccordian filterNotes={formData}>
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
        <MenuItem value="0">(All)</MenuItem>
        <MenuItem value={"1"}>Active only</MenuItem>
        <MenuItem value={"2"}>Inactive only</MenuItem>
      </TextField>
      </Grid>
      <Grid item xs={12}>
      <TextField
        size="small"
        select
        fullWidth
        name="filters.level"
        label="Level"
        id={"selector"}
        value={formData.values.filters.level}
        onChange={formData.handleChange}
      >
        <MenuItem value="0">(All)</MenuItem>
        <MenuItem value="1">Global</MenuItem>
        <MenuItem value="2">ShopGrouping</MenuItem>
        <MenuItem value="3">ShopSplit</MenuItem>
      </TextField> </Grid>

      {formData.values.filters.level > 1 && (
         <Grid item xs={12}>
        <TextField
          size="small"
          select
          fullWidth
          name="filters.shopID"
          label={
            formData.values.filters.level === "2"
              ? "Shop Grouping"
              : formData.values.filters.level === "3"
              ? "Shop Split"
              : ""
          }
          id={"filters.shopID"}
          value={formData.values.filters.shopID}
          onChange={formData.handleChange}
        >
          <MenuItem value={"0"}>All</MenuItem>
          {formData.values.filters.level ==="2" ? shopData.map((shop) => (
            <MenuItem key={shop.ID} value={shop.ID}>
              {shop.DisplayName}
            </MenuItem>
          )): splitData.map((split) => (
            <MenuItem key={split.ID} value={split.ID}>{split.DisplayName}</MenuItem>
          ))}
        </TextField></Grid>
      )}
    </CustomAccordian>
  );
}

export default SelectFilter;
