import { MenuItem, TextFieldTypography, TextField, Grid } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { ExpandMoreIcon } from "@mui/icons-material";
import CustomAccordian from "../Accordian/CustomAccordian";
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

  return (
    <CustomAccordian>
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
        <MenuItem value="0">All</MenuItem>
        <MenuItem value="1">GLOBAL</MenuItem>
        <MenuItem value="2">SHOPGROUPING</MenuItem>
        <MenuItem value="3">SHOPSPLIT</MenuItem>
      </TextField>

      {formData.values.filters.level > 1 && (
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
          {shopData.map((shop) => (
            <MenuItem key={shop.ID} value={shop.ID}>
              {shop.DisplayName}
            </MenuItem>
          ))}
        </TextField>
      )}
    </CustomAccordian>
  );
}

export default SelectFilter;
