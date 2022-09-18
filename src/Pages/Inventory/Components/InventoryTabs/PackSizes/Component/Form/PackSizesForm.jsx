import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShopGrouping, ShopSplits } from "../../../../../../../API/api";

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
function PackSizesForm({setOpen,selectedForUpdate=null}) {
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
        Category: "0",
        Quantity: "",
        SKU:""
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
        setFieldValue("Category",selectedForUpdate.Category)
        setFieldValue("Quantity",selectedForUpdate.Quantity)
        setFieldValue("SKU",selectedForUpdate.SKU)
 
      }
    },[selectedForUpdate])
  // Global = 1
  // ShopGrouping  = 2
  // Shop SPLIT  = 3
  return (
    <>
    <Grid item xs={12}>
        <TextField
          select
          size="small"
          fullWidth
          name="Category"
          label="Purchase Category"

          value={values.Category}
          onChange={handleChange}
        >
          <MenuItem value="1">TEST</MenuItem>
          
        </TextField>
      </Grid>
     <Grid container rowGap={2}>
      <Grid item xs={12}>
        <TextField
          autoFocus
          margin="dense"
          id="SKU"
          label="SKU"
          type="name"
          fullWidth
          size="small"
          error={!!errors.SKU}
          helperText={errors.SKU}
          value={values.SKU}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          autoFocus
          margin="dense"
          id="Quantity"
          label="Quantity"
          type="number"
          fullWidth
          size="small"
          error={!!errors.Quantity}
          helperText={errors.Quantity}
          value={values.Quantity}
          onChange={handleChange}
        />
      </Grid>
      


      <Grid item xs={12}>
        <ButtonGroup
          variant="spaced"
          aria-label="outlined primary button group"
        >
          <Button  onClick={submitForm} color="success">Save</Button>
          <Button
            sx={{ backgroundColor: "red", color: "white" }}
            variant="contained"
            onClick={()=>{
              setOpen(false)
            }}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  </>
  );
}

export default PackSizesForm;
