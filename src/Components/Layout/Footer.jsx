import React from 'react'
import {Paper,Typography } from '@mui/material'
import {Version,AppName,Year} from '../../Constants/AppConstants'
function Footer() {
  return (
    <Paper sx={{display:"flex",justifyContent:"center",alignItems:"center", position: 'fixed', bottom: 0, left: 0, right: 0, height:50 }} elevation={3}>
   
    <Typography> {`${AppName} ${String.fromCharCode("0169")} ${Year}. Ver. ${Version} All Rights Reserved. Created by `  } <a href='https://techgenius.co.za'>Tech Genius</a> </Typography>
      

  </Paper>
  )
}

export default Footer