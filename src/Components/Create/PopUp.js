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
import { createSKUBrand } from "../../API/SKU.api";
import { useFormik } from "formik";
// import { makeStyles } from "@material-ui/core/styles";
export default function PopUp({setOpen,open}) {
  const queryClient = useQueryClient()
  const { mutate: CreateSkuBrand } = useMutation(createSKUBrand, {
    onSuccess: () => {
      // When the SKU brand is created, we invalidate the original query we made on the SKUBrands page. This will trigger react query to pull the data again.
      // It does a compare and only will re render if the values have changed
      // You can check the console, it's logging "Called" after you click create
      //  "SKUBrands is the key that we gave it"
      queryClient.invalidateQueries("skuBrands")
    },
    onSettled:()=>{
     
      
      handleClose();
    }
  });

  const myForm = useFormik({
    initialValues: {
      DisplayName: "",
      Level: "1",
    },
    onSubmit: (values) => {
      CreateSkuBrand(values);
    },
  });

  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
                value={myForm.values.DisplayName}
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
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={myForm.submitForm} type="submit">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
