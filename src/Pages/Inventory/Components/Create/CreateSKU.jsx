import React, { useState, useEffect } from 'react'
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
  import { createSKU } from '../../../../API/SKU.api';
import axios from 'axios';

function CreateSKU({open, setOpen}) {
    const [brands, setBrands] = useState([])
    const [purchase, setPurchase] = useState([])
    const [UoM, setUoM] = useState([])
    const [pack, setPack] = useState([])
    const queryClient = useQueryClient()

    const { mutate: CreateSkuMutation } = useMutation(createSKU, {
        onSuccess: () => {
          // When the SKU brand is created, we invalidate the original query we made on the SKUBrands page. This will trigger react query to pull the data again.
          // It does a compare and only will re render if the values have changed
          // You can check the console, it's logging "Called" after you click create
          //  "SKUBrands is the key that we gave it"
          queryClient.invalidateQueries("SKU")
        },
        onSettled:()=>{
         
          
          handleClose();
        }
      });

      const myForm = useFormik({
        initialValues: {
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
            CreateSkuMutation(values);
        },
      });


    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      async function fetchPurchaseCategory(){
        const res = await axios.get("")
        const purchaseCategory = res.data;
        console.log(purchaseCategory)
        setPurchase(purchaseCategory)

      }
    
      async function fetchSkuBrands(){
        const res = await axios.get("")
        const skuBrands = res.data;
        console.log(skuBrands)
        setBrands(skuBrands)

      }

      async function fetchUoM(){
        const res = await axios.get("")
        const unit = res.data;
        console.log(unit)
        setUoM(unit)

      }
      async function fetchPackaging(){
        const res = await axios.get("")
        const packaging = res.data;
        console.log(packaging)
        setPack(packaging)

      }

      // useEffect(() => {
      //   fetchSkuBrands();
      //   fetchUoM();
      //   fetchPackaging();
      //   fetchPurchaseCategory();
      // }, []);


  return (
    <Container>


    <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
    <DialogTitle>Create SKU</DialogTitle>
    <DialogContent>
    <Grid container rowGap={2}>
        <Grid item xs={12}>
          <TextField
            size="small"
            fullWidth
            name="DisplayName"
            label="Display Name"
            id={"DisplayName"}
            type="name"
            value={myForm.values.DisplayName}
            onChange={myForm.handleChange}
          />


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
            <MenuItem value="0">GLOBAL</MenuItem>
            <MenuItem value="1">Shop Grouping</MenuItem>
            <MenuItem value="2">Shop Split</MenuItem>
          </TextField>


          <TextField
            select
            size="small"
            fullWidth
            name="Category"
            label="Purchase Category"
            id={"Category"}
            value={myForm.values.PurchaseCategory}
            onChange={myForm.handleChange}
          > 
            <MenuItem value="1">GLOBAL</MenuItem>
          </TextField>


          <TextField
            select
            size="small"
            fullWidth
            name="ProdServ"
            label="Product / Service"
            id={"ProdServ"}
            value={myForm.values.ProdServ}
            onChange={myForm.handleChange}
          > 
            <MenuItem value="0">Product</MenuItem>
            <MenuItem value="1">Service</MenuItem>
          </TextField>



          <TextField
            select
            size="small"
            fullWidth
            name="brand"
            label="SKU Brand"
            id={"brand"}
            value={myForm.values.SKUBrand}
            onChange={myForm.handleChange}
          > 
            <MenuItem value="1">GLOBAL</MenuItem>
          </TextField>


          <TextField
            autoFocus
            margin="dense"
            id="feature2"
            label="Brand Feature 1"
            type="name"
            fullWidth
            variant="standard"
            defaultValue={myForm.values.BrandFeature1}
            onChange={myForm.handleChange}
          />
          
          <TextField
            autoFocus
            margin="dense"
            id="feature2"
            label="Brand Feature"
            type="name"
            fullWidth
            variant="standard"
            defaultValue={myForm.values.BrandFeature2}
            onChange={myForm.handleChange}
          />


          <TextField
            select
            size="small"
            fullWidth
            name="fixed"
            label="Fixed Quantity"
            id={"fixedQ"}
            value={myForm.values.FizedQuantity}
            onChange={myForm.handleChange}
          > 
            <MenuItem value="1">GLOBAL</MenuItem>
          </TextField>

          <TextField
            autoFocus
            margin="dense"
            id="Quantiy"
            label="Quantity"
            type="number"
            fullWidth
            variant="standard"
            defaultValue={myForm.values.Quantity}
            onChange={myForm.handleChange}
          />



          <TextField
            select
            size="small"
            fullWidth
            name="UoM"
            label="Unit of Measure"
            id={"UoM"}
            value={myForm.values.UoM}
            onChange={myForm.handleChange}
          > 
            <MenuItem value="1">GLOBAL</MenuItem>
          </TextField>



          <TextField
            select
            size="small"
            fullWidth
            name="Packaging"
            label="Packaging"
            id={"Packaging"}
            value={myForm.values.Packaging}
            onChange={myForm.handleChange}
          > 
            <MenuItem value="1">GLOBAL</MenuItem>
          </TextField>



          <TextField
            select
            size="small"
            fullWidth
            name="MainSub"
            label="Main / Sub Item"
            id={"MainSub"}
            value={myForm.values.MainSub}
            onChange={myForm.handleChange}
          > 
            <MenuItem value="1">GLOBAL</MenuItem>
          </TextField>


          <TextField
            select
            size="small"
            fullWidth
            name="returnable"
            label="is Returnable"
            id={"returnable"}
            value={myForm.values.returnable}
            onChange={myForm.handleChange}
          > 
            <MenuItem value="1">GLOBAL</MenuItem>
          </TextField>


          <TextField
            select
            size="small"
            fullWidth
            name="VAT"
            label="VAT"
            id={"VAT"}
            value={myForm.values.VAT}
            onChange={myForm.handleChange}
          > 
            <MenuItem value="0">VAT</MenuItem>
            <MenuItem value="1">NoVAT</MenuItem>
          </TextField>

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

export default CreateSKU