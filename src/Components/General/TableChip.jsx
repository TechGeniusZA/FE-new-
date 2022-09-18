import React from 'react'
import { Chip } from "@mui/material";
function TableChip({width="fit-content",label="",color="default"}) {
    // Returns a chip to be used in the datagrids
  return (
    <Chip
    sx={{color:color === "default" ? "black": "white", width: width, backgroundColor:color === "default" ? "grey":  color}}
    label={label}
    
  />
  )
}

export default TableChip