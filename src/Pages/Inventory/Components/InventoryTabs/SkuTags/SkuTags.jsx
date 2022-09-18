import React from 'react'
import { MenuItem, TextFieldTypography, TextField, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { DataGrid, GridLinkOperator } from "@mui/x-data-grid";
import axios from "axios";
import { useFormik } from 'formik';

import CustomToolBar from "../../../../../Components/DataGrid/CustomToolbar";

const columns = [
    { field: "action", headerName: " ", width: 90 },
    {
      field: "DisplayName",
      headerName: "Display Name",
      editable: false,
      flex: 1,
    }
  ];
  
  
function SkuTags() {
    const [data, setData] = useState([])
    async function fetchTagData() {
        const res = await fetch("/Inventory/GetSKUTags", {
          method: "GET",
        });
        const data = await res.json();
        console.log(data.data)
        setData(data.data);
      }
    useEffect(() => {
        fetchTagData();
      }, []);



  return (
    <Grid item xs={12}>
        <DataGrid
          autoHeight
          rows={data}
        //   loading={isLoading}
          columns={columns}
          getRowId={(row) => row.ID}
          onCellEditStop={(_, e) => console.log(e.target)}
          componentsProps={{ toolbar: { csvOptions: { allColumns: true } } }}
          components={{
            Toolbar: CustomToolBar
          }}
        />
      </Grid>

  )
}

export default SkuTags