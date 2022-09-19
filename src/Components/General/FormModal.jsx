import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: "fit-content",
  minWidth:"500px",
  bgcolor: 'background.paper',
  borderRadius:2,
  boxShadow: 24,
  p: 4,
};

export default function FormModal({children,open,setOpen,label}) {
  

  const handleClose = () => setOpen(false);
 

  return (
    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container rowGap={2}>
          <Grid item xs={12}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            
          {label}
          </Typography></Grid>
         {children}
         </Grid>
        </Box>
      </Modal>
    </div>
  );
}
