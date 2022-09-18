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
  import { createPackSize } from '../../../../API/SKU.api';


function CreatePackSize({open, setOpen}) {
    const queryClient =  useQueryClient()

    const { mutate: CreatePackSizeMutation } = useMutation(createPackSize, {
        onSuccess: () => {
          // When the SKU brand is created, we invalidate the original query we made on the SKUBrands page. This will trigger react query to pull the data again.
          // It does a compare and only will re render if the values have changed
          // You can check the console, it's logging "Called" after you click create
          //  "SKUBrands is the key that we gave it"
          queryClient.invalidateQueries("packsize")
        },
        onSettled:()=>{
         
          
          handleClose();
        }
      });

      const myForm = useFormik({
        initialValues: {
        Category: "0",
        Quantity: "",
        SKU:""

        },
        onSubmit: (values) => {
            CreatePackSizeMutation(values);
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
        <DialogTitle>Create Pack Size</DialogTitle>
        <DialogContent>
        <Grid container rowGap={2}>
            <Grid item xs={12}>
              <TextField
                select
                size="small"
                fullWidth
                name="Category"
                label="SKU Category"
                id={"Category"}
                value={myForm.values.Category}
                onChange={myForm.handleChange}
              > 
                <MenuItem value="1">GLOBAL</MenuItem>
              </TextField>
              <TextField
                autoFocus
                margin="dense"
                id="SKU"
                label="SKU"
                type="name"
                fullWidth
                variant="standard"
                defaultValue={myForm.values.SKU}
                onChange={myForm.handleChange}
              />
              <TextField
                autoFocus
                margin="dense"
                id="Quantiy"
                label="Quantity"
                type="name"
                fullWidth
                variant="standard"
                defaultValue={myForm.values.Quantity}
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

export default CreatePackSize