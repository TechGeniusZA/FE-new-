
import { Box, Container} from "@mui/system";
import React, { useEffect, useState } from "react";
import { TextField,  Dialog, DialogActions, MenuItem, DialogContent, DialogContentText, DialogTitle, Button, FormControl} from "@mui/material";

// import { makeStyles } from "@material-ui/core/styles";
export default function PopUp() {

  const [name, setName] = useState([])
  const [selector, setSelector] = useState([])

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


    const createSKu = async(e) => {
      e.preventDefault()

      const data = {
        name,
        selector, 
        isActive:true

      }
        await axios.post("/Inventory/AddEditBrand", 
        {...data})
      
    }



    
    
 
  return (
    <Container>
        <Button variant="outlined" onClick={handleClickOpen}>
        Create
      </Button>
   
      <Dialog fullWidth maxWidth ="md" open={open} onClose={handleClose} 
      >
        
        <DialogTitle>Create Sku Brand</DialogTitle>
        <DialogContent>
          <FormControl onSubmit={createSKu}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Display Name"
            type="name"
            fullWidth
            variant="standard"
            onChange={(e) => setName(e.target.value)}
          />
        
          <TextField
          select
          fullWidth
            name="selector"
          label="selector"
          id={"selector"}
          onChange={(e) => setSelector(e.target.value)}
        >
          <MenuItem value="#GLOBAL">GLOBAL</MenuItem>
          <MenuItem value="#SHOPGROUPING">SHOPGROUPING</MenuItem>
          <MenuItem value="#SHOPSPLIT">SHOPSPLIT</MenuItem>
        </TextField>
        </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} type="submit">Create</Button>
        </DialogActions>
      </Dialog>

    </Container>
  )
}
