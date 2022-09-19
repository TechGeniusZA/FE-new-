import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShopGrouping, ShopSplits } from "../../../../../../../API/api";
import { SkuBrandValidation } from "./Validation";
import ButtonGroup from "@mui/material/ButtonGroup";
import {
  TextField,
  Dialog,
  DialogActions,
  MenuItem,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  FormControl,
  Grid,
} from "@mui/material";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
//import { updateSkuBrand } from "../../API/SKU.api";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import FormSkeleton from "../../../../../../../Components/General/FormSkeleton";

const editAddBrand = async (data) => {
  
  let makingItFormDataLikeOldSchool = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if(value === " "){
      makingItFormDataLikeOldSchool.append(key, "");
      return
    }else{
      makingItFormDataLikeOldSchool.append(key, value);
    }
  
  });

 let res = await axios.post("Inventory/AddEditBrand", makingItFormDataLikeOldSchool);
   return   res.data;
};
function SKUBrandForm({setOpen,selectedForUpdate=null}) {
  const queryClient = useQueryClient();
  // Shop Group query
  const { data: shopGrouping,isLoading:SGL } = useQuery(
    ["Shopgrouping", { Industry: 0, Client: 0, Active: 0 }],
    ShopGrouping
  );

  // Shop Split  query
  const { data: shopSplits,isLoading:SSL } = useQuery(
    ["Shopsplits", { Client: 0, ShopGrouping: 0, Location: 0, Active: 0 }],
    ShopSplits
  );

  // Mutation
  const { mutate: editUpdateSKU } = useMutation(editAddBrand, {
    onSuccess: (d) => {
      
      queryClient.invalidateQueries("skuBrands");
      toast("SKU Brand Created",{
        type: "success"
      })
      setOpen(false)
    },
    onError:(d)=>{
      console.log(d)
      toast("SKU Brand Failed",{
        type: "error"
      })
    }
  
  });
  //
  // Form
  //DisplayName=AnotherTestt&ID=12&IsActive=true&Level=1&ShopSplitID=&ShopGroupingID=
  const { errors, values, setFieldValue, isValid, submitForm, handleChange } =
    useFormik({
      initialValues: {
        ID: "0",
        DisplayName: " ",
        Level: "1",
        IsActive: true,
        ShopSplitID: " ",
        ShopGroupingID: " ",
      },
 
      onSubmit: (values) => {
      
        editUpdateSKU(values);
      },
    });

    useEffect(()=>{
      console.log("selected",selectedForUpdate)
      if(selectedForUpdate != null){
          console.log(selectedForUpdate)
        setFieldValue("ID",selectedForUpdate.ID)
        setFieldValue("DisplayName",selectedForUpdate.DisplayName)
        setFieldValue("Level",selectedForUpdate.Level == "#ShopGrouping" ? "2" :selectedForUpdate.Level == "#Shop" ? "3" : "1" )
        setFieldValue("IsActive",selectedForUpdate.IsActive)
        setFieldValue("ShopSplitID",selectedForUpdate.ShopSplitID)
        setFieldValue("ShopGroupingID",selectedForUpdate.ShopGroupingID)
      }
    },[selectedForUpdate])
  // Global = 1
  // ShopGrouping  = 2
  // Shop SPLIT  = 3
  return (
    <>
  { (!SGL & !SSL) ? 
     <Grid container rowGap={2}>
      <Grid item xs={12}>
        <TextField
          autoFocus
          margin="dense"
          id="DisplayName"
          label="Display Name"
          type="name"
          fullWidth
          size="small"
          error={!!errors.DisplayName}
          helperText={errors.DisplayName}
          value={values.DisplayName}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          select
          size="small"
          fullWidth
          name="Level"
          label="Level"
          id={"Level"}
          value={values.Level}
          onChange={handleChange}
        >
          <MenuItem value="1">GLOBAL</MenuItem>
          <MenuItem value="2">SHOPGROUPING</MenuItem>
          <MenuItem value="3">SHOPSPLIT</MenuItem>
        </TextField>
      </Grid>


      {values.Level == 2 && (
        <Grid item xs={12}>
          <TextField
            size="small"
            select
            fullWidth
            defaultValue={""}
            name="ShopGroupingID"
            label="Shop Grouping"
            value={values.ShopGroupingID}
            onChange={handleChange}
          >
            <MenuItem value=" ">Select</MenuItem>
            {shopGrouping &&
              shopGrouping.data.map((shop) => (
                <MenuItem key={shop.ID} value={shop.ID}>
                  {shop.DisplayName}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
      )}

      {/** SHOP SPLIT FORM */}
      {values.Level ==3 && (
        <Grid item xs={12}>
          <TextField
            size="small"
            select
            fullWidth
            name="ShopSplitID"
            label={"Shop Split"}
         
            value={values.ShopSplitID}
            onChange={handleChange}
          >
            <MenuItem value={" "}>Select</MenuItem>
            { shopSplits &&
                shopSplits.map((split) => (
                  <MenuItem key={split.ID} value={split.ID}>
                    {split.DisplayName}
                  </MenuItem>
                ))}
          </TextField>
        </Grid>
      )}

      <Grid item xs={12}>
        <ButtonGroup
          variant="spaced"
          aria-label="outlined primary button group"
        >
          <Button  variant="contained"  onClick={submitForm} color="success">Save</Button>
          <Button
           color="error"
            variant="contained"
            onClick={()=>{
              setOpen(false)
            }}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid> :<FormSkeleton /> 
  }</>
  );
}

export default SKUBrandForm;
