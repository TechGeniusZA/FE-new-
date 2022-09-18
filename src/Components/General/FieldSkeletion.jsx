import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function FieldSkeleton() {
  return (
    <Box sx={{ width: "100%"}}>
      <Skeleton height={60} />
      <Skeleton animation="wave"  height={60}/>
      <Skeleton animation={false}  height={60}/>
   
    
    </Box>
  );
}
