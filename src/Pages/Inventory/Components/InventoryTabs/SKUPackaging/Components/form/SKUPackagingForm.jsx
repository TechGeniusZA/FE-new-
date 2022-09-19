import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShopGrouping, ShopSplits } from "../../../../../../../API/api";
// import { SkuBrandValidation } from "./Validation";
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

 let res = await axios.post("/Inventory/EditSKUPackaging", makingItFormDataLikeOldSchool);
   return   res.data;
};
function SKUPackagingForm({setOpen,selectedForUpdate=null}) {
  const queryClient = useQueryClient();
  

  // Mutation
  const { mutate: editUpdateSKU } = useMutation(editAddBrand, {
    onSuccess: (d) => {
      
      queryClient.invalidateQueries("skuPackaging");
      toast("SKU Packaging Created",{
        type: "success"
      })
      setOpen(false)
    },
    onError:(d)=>{
      console.log(d)
      toast("SKU Packaging Failed",{
        type: "error"
      })
    }
  
  });
  const { errors, values, setFieldValue, isValid, submitForm, handleChange } =
    useFormik({
      initialValues: {
        ID: "0",
        DisplayName: " ",
        IsActive: true,

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
        setFieldValue("IsActive",selectedForUpdate.IsActive)
      
      }
    },[selectedForUpdate])
  return (
    <>
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
        <ButtonGroup
          variant="spaced"
          aria-label="outlined primary button group"
        >
          <Button variant="contained"  onClick={submitForm} color="success">Save</Button>
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
    </Grid>
  </>
  );
}

export default SKUPackagingForm;
