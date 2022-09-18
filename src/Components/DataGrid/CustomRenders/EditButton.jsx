import React from 'react'
import { Button, Grid, IconButton, Tooltip, MenuItem, Typography } from "@mui/material";
import {
    Create,
    Delete,
    FitbitOutlined,
    FitScreen,
    Label,
    RestartAlt,
  } from "@mui/icons-material";
function EditButton({edit}) {
  return (
   
    <IconButton
      onClick={() => {
       
      edit()
      }}
    >
     
      <Tooltip title={"Edit"} placement="top" >
        <Create sx={{color: "#2196f3"}} />
      </Tooltip>
    </IconButton>

  )
}

export default EditButton