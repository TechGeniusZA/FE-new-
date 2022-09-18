import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShopGrouping, ShopSplits, SKUBrands, PurchaseCategory, UnitOfMeasure } from "../../../../../../../API/api";
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
function SKUForm({setOpen,selectedForUpdate=null}) {
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
  //Purchase Category query
  const { data: purchaseCategory,isLoading:PC } = useQuery(
    ["PurchaseCategory", { ActiveStatus: 0 }],
    PurchaseCategory
  );
//SKU Brand query
  const { data: skuBrand,isLoading:SKB } = useQuery(
    ["SKUBrand", {ShopID: 0, Level: 0, Active: 0 }],
    SKUBrands
  );
 //Unit Of Measure query
  const { data: unitOM,isLoading:Uni} = useQuery(
    ["unitOM"],
    UnitOfMeasure
  );


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
        DisplayName:"",
        Level:"0",
        PurchaseCategory:"0",
        ProdServ:"0",
        SKUBrand:"0",
        BrandFeature1:"",
        BrandFeature2:"",
        FizedQuantity:"0",
        Quantity:"",
        UoM:"0",
        Packaging:"0",
        MainSub:"0",
        returnable:"0",
        VAT:"0",

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
        setFieldValue("Level",selectedForUpdate.Level)
        setFieldValue("PurchaseCategory",selectedForUpdate.PurchaseCategory)
        setFieldValue("ProdServ",selectedForUpdate.ProdServ)
        setFieldValue("SKUBrand",selectedForUpdate.SKUBrand)
        setFieldValue("BrandFeature1",selectedForUpdate.BrandFeature1)
        setFieldValue("BrandFeature2",selectedForUpdate.BrandFeature2)
        setFieldValue("FizedQuantity",selectedForUpdate.FizedQuantity)
        setFieldValue("Quantity",selectedForUpdate.Quantity)
        setFieldValue("UoM",selectedForUpdate.UoM)
        setFieldValue("Packaging",selectedForUpdate.Packaging)
        setFieldValue("MainSub",selectedForUpdate.MainSub)
        setFieldValue("returnable",selectedForUpdate.returnable)
        setFieldValue("VAT",selectedForUpdate.VAT)
      
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

{/* <Grid item xs={12}>
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
              purchaseCategory.data.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.displayName}
                </MenuItem>
              ))}
          </TextField>
        </Grid> */}
<Grid item xs={12}>
          <TextField
            size="small"
            select
            fullWidth
            defaultValue={""}
            name="UoM"
            label="Unit Of Measure"
            value={values.UoM}
            onChange={handleChange}
          >
            <MenuItem value=" ">Select</MenuItem>
            {unitOM &&
              unitOM.data.map((unit) => (
                <MenuItem key={unit.id} value={unit.id}>
                  {unit.displayName}
                </MenuItem>
              ))}
          </TextField>
        </Grid>

      <Grid item xs={12}>
      <TextField
            select
            size="small"
            fullWidth
            name="ProdServ"
            label="Product / Service"
            id={"ProdServ"}
            value={values.ProdServ}
            onChange={handleChange}
          > 
            <MenuItem value="0">Product</MenuItem>
            <MenuItem value="1">Service</MenuItem>
          </TextField>
      </Grid>
      <Grid item xs={12}>
          <TextField
            size="small"
            select
            fullWidth
            defaultValue={""}
            name="SKUBrand"
            label="SKU Brand"
            value={values.SKUBrand}
            onChange={handleChange}
          >
            <MenuItem value=" ">Select</MenuItem>
            {skuBrand &&
              skuBrand.data.map((brand) => (
                <MenuItem key={brand.ID} value={brand.ID}>
                  {brand.DisplayName}
                </MenuItem>
              ))}
          </TextField>
        </Grid>


      <Grid item xs={12}>
        <TextField
          autoFocus
          margin="dense"
          id="BrandFeature1"
          label="Brand Feature 1"
          type="name"
          fullWidth
          size="small"
          error={!!errors.BrandFeature1}
          helperText={errors.BrandFeature1}
          value={values.BrandFeature1}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          autoFocus
          margin="dense"
          id="BrandFeature2"
          label="Brand Feature 2"
          type="name"
          fullWidth
          size="small"
          error={!!errors.BrandFeature2}
          helperText={errors.BrandFeature2}
          value={values.BrandFeature2}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12}>
      <TextField
            select
            size="small"
            fullWidth
            name="FizedQuantity"
            label="Fized Quantity"
            id={"FizedQuantity"}
            value={values.FizedQuantity}
            onChange={handleChange}
          > 
            <MenuItem value="0">Fixed</MenuItem>
            <MenuItem value="1">Not Fixed</MenuItem>
          </TextField>
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
      <TextField
            select
            size="small"
            fullWidth
            name="MainSub"
            label="Main / Sub Item"
            id={"MainSub"}
            value={values.MainSub}
            onChange={handleChange}
          > 
            <MenuItem value="0">Main</MenuItem>
            <MenuItem value="1">Sub</MenuItem>
          </TextField>
      </Grid>
      <Grid item xs={12}>
      <TextField
            select
            size="small"
            fullWidth
            name="returnable"
            label="is Returnable"
            id={"returnable"}
            value={values.returnable}
            onChange={handleChange}
          > 
            <MenuItem value="0">Returnable</MenuItem>
            <MenuItem value="1">Not Returnable</MenuItem>
          </TextField>
      </Grid>
      <Grid item xs={12}>
      <TextField
            select
            size="small"
            fullWidth
            name="VAT"
            label="VAT"
            id={"VAT"}
            value={values.VAT}
            onChange={handleChange}
          > 
            <MenuItem value="0">VAT</MenuItem>
            <MenuItem value="1">No VAT</MenuItem>
          </TextField>
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

export default SKUForm;
