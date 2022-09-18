import React from 'react'

import { Button, Grid, IconButton, Tooltip, MenuItem, Typography } from "@mui/material";
import {
    Create,
    Delete,
    FitbitOutlined,
    FitScreen,
    Label,
    RestartAlt,
    Block
  } from "@mui/icons-material";
function ActivateButton({row,edit}) {
  return (
    <IconButton  
    onClick={edit}
  >
   
    <Tooltip
      title={
        row.IsActive
          ? "Deactivate"
          : "Activate"
      }
      placement="top"
    >
      {row.IsActive ? (
        <Block color='error'/>
      ) : (
        <RestartAlt sx={{color: "#3e9e43"}} />
      )}
    </Tooltip>
  </IconButton>
  )
}

export default ActivateButton