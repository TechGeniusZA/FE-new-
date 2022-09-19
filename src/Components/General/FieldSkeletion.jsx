import * as React from 'react';
import {Box,Grid} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

export default function FieldSkeleton() {
  return (
    <Box sx={{ width: "100%"}}>
         <Grid container rowGap={1}>
        <Grid item xs={12}> <Skeleton height={60} /></Grid>
        <Grid item xs={1}></Grid><Grid item xs={11}> <Skeleton height={60} /></Grid>
        <Grid item xs={2}></Grid><Grid item xs={10}> <Skeleton height={60} /></Grid>
     

     
      
   
      </Grid>
   
    
    </Box>
  );
}
