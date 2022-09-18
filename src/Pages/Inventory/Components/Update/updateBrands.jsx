import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
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
import { useMutation,useQueryClient}  from "@tanstack/react-query";
import { updateSkuBrand } from "../../API/SKU.api";
import { useFormik } from "formik";


function updateBrands() {

    const queryClient = useQueryClient()


    const {mutate: updateSkuBrandMutation} = useMutation(updateSkuBrand,{
        onSuccess:()=>{
            queryClient.invalidateQueries("skuBrands") 
        },
        onSettled:()=>{
     
      
            handleClose();
          }
    })

    const myForm = useFormik({
        initialValues: {
          DisplayName: "",
          Level: "1",
        },
        onSubmit: (values) => {
          updateSkuBrandMutation(values);
        },
      });

  return (
    <Container>
    

      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>Create Sku Brand</DialogTitle>
        <DialogContent>
          <Grid container rowGap={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                id="DisplayName"
                label="Display Name"
                type="name"
                fullWidth
                variant="standard"
                defaultValue={myForm.values.DisplayName}
                onChange={myForm.handleChange}
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
                value={myForm.values.Level}
                onChange={myForm.handleChange}
              > 
                <MenuItem value="1">GLOBAL</MenuItem>
                <MenuItem value="2">SHOPGROUPING</MenuItem>
                <MenuItem value="3">SHOPSPLIT</MenuItem>
              </TextField>

              {myForm.values.Level > 1 && (
                <TextField
                size="small"
                select 
                fullWidth
                name="create.ShopID"
                InputLabelProps={myForm.values.Level ==="2 " ? "Shop Grouping"
                :myForm.values.Level ==="3" ? "Shop Split" : "Shop Split"
              }
              id={"create.ShopID"}
              value={myForm.values.ShopID}
              onChange={myForm.handleChange}
                >
                 
      
                  {myForm.values.Level === "2" ? shopData.map((shop) => (
                    <MenuItem key={shop.ID} value={shop.ID}>{shop.DisplayName}</MenuItem>
                  )): splitData.map((split => (
                    <MenuItem key={split.ID} value={split.ID}>{split.DisplayName}</MenuItem>
                  )))}
                  

                </TextField>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={myForm.submitForm} type="submit">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default updateBrands