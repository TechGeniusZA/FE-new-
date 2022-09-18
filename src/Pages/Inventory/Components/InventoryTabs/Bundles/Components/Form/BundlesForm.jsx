import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PurchaseCategory } from "../../../../../../../API/api";
import { skuFilters } from "../../../../../../../API/SKU.api";
import Autocomplete from '@mui/material/Autocomplete';
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
function BundlesForm({setOpen,selectedForUpdate=null}) {
  const queryClient = useQueryClient();

  const { data: purchaseCategory,isLoading:PC } = useQuery(
    ["PurchaseCategory", { ActiveStatus: 0 }],
    PurchaseCategory,{
      onSuccess:(d)=>{
        console.log((d))
      }
    }
  );
  const { data: sku,isLoading:uks} = useQuery(
    ["SKU", { Active: 0, Category:0, Product:0, DisplayName:0, Brand:0}],
    skuFilters, {
      onSuccess:(d)=>{
        console.log((d))
        console.log("sku", sku)
      }
      
    }
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
        PurchaseCategory:"0",
        MainSku: "",
        Packsize:"",
        SubSku:"",
        Quantity:""
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
        setFieldValue("PurchaseCategory",selectedForUpdate.PurchaseCategory)
        setFieldValue("MainSku",selectedForUpdate.MainSku)
        setFieldValue("Packsize",selectedForUpdate.Packsize)
        setFieldValue("SubSku",selectedForUpdate.SubSku)
        setFieldValue("Quantity",selectedForUpdate.Quantity)
 
      }
    },[selectedForUpdate])
  // Global = 1
  // ShopGrouping  = 2
  // Shop SPLIT  = 3
  return (
    <>
       <Grid item xs={12}>
          <TextField
            size="small"
            select
            fullWidth
            defaultValue={""}
            name="PurchaseCategory"
            label="Purchase Category"
            value={values.PurchaseCategory}
            onChange={handleChange}
          >
            <MenuItem value=" ">Select</MenuItem>
            {purchaseCategory &&
              purchaseCategory.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.displayName}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
     <Grid container rowGap={2}>
     <Grid item xs={12}>
  
     <Autocomplete
      disablePortal
      id="combo-box-demo" 
      options={sku}
      value={values.MainSku}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />
      </Grid>

      <Grid item xs={12}>
        <TextField
          select
          size="small"
          fullWidth
          name="Packsize"
          label="Packsize"
          value={values.Packsize}
          onChange={handleChange}
        >
          <MenuItem value="1">TEST</MenuItem>
          
        </TextField>
      </Grid>

      
      <Grid item xs={12}>
        <TextField
          autoFocus
          margin="dense"
          id="SubSku"
          label="Sub SKU"
          type="name"
          fullWidth
          size="small"
          error={!!errors.SubSku}
          helperText={errors.SubSku}
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

export default BundlesForm;
