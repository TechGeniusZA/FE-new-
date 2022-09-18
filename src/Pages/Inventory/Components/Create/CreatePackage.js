import React from 'react'
import { Box, Container } from "@mui/system";
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
  import { useFormik } from "formik";
  import { createSKUPackage } from "../../../../API/SKU.api";
function CreatePackage({setOpen,open}) {
    const queryClient = useQueryClient()

    const { mutate: CreateSkuPackageMutation } = useMutation(createSKUPackage, {
        onSuccess: () => {
          // When the SKU brand is created, we invalidate the original query we made on the SKUBrands page. This will trigger react query to pull the data again.
          // It does a compare and only will re render if the values have changed
          // You can check the console, it's logging "Called" after you click create
          //  "SKUBrands is the key that we gave it"
          queryClient.invalidateQueries("skuPackage")
        },
        onSettled:()=>{
         
          
          handleClose();
        }
      });

    const myForm = useFormik({
        initialValues: {
          DisplayName: "",
        },
        onSubmit: (values) => {
          CreateSkuPackageMutation(values);
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
        <DialogTitle>Create Sku Packaging</DialogTitle>
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={myForm.submitForm} type="submit">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default CreatePackage