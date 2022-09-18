import React from 'react'
import { MenuItem, TextFieldTypography, TextField, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { DataGrid, GridLinkOperator } from "@mui/x-data-grid";
import axios from "axios";
import { useFormik } from 'formik';

import CustomToolBar from '../../../../../Components/DataGrid/CustomToolbar';
import EditButton from '../../../../../Components/DataGrid/CustomRenders/EditButton';
import ActivateButton from '../../../../../Components/DataGrid/CustomRenders/ActivateButton';

const columns = [
  { field: "action", headerName: "Actions", width: 90,
  renderCell: ({ row }) => {
    return (
      <>
      <EditButton edit={()=>{
        alert("DO An edit")
      }}/>
      <ActivateButton row={row} edit={()=>{
alert("Update id " + row.id + "Update data");
      }}/>
        

        
      </>
    ); }
 },
    {
      field: "FromQty",
      headerName: "From Qty",
      editable: false,
      flex: 1,
    },
    {
      field: "FromUoM",
      headerName: "From UoM",
      flex: 1,
      editable: false,
    },
    {
      field: "ToQty",
      headerName: "To Qty",
      editable: false,
      flex: 1,
    },
    {
      field: "ToUoM",
      headerName: "To UoM",
      flex: 1,
      sortable: false,
    },
  ];
  
  
function UoMConversions() {
    const [data, setData] = useState([])
    async function fetchUomData() {
        const res = await axios.get("/Inventory/GetSKUUoMConversions")
        return res.data.data
      }

  const {isLoading,error,status,data:UoMCons = []} = useQuery(["UoMConversions"],fetchUomData)
    useEffect(() => {
      status === "success" && console.log(UoMCons)
      }, [status]);



  return (
    <Grid item xs={12}>

        <DataGrid
          autoHeight
          rows={UoMCons}
      loading={isLoading}
          columns={columns}
          getRowId={(row) => row.ID}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          }
          getRowHeight={() => 'auto'}
          onCellEditStop={(_, e) => console.log(e.target)}
          componentsProps={{ toolbar: { csvOptions: { allColumns: true } } }}
          components={{
            Toolbar: CustomToolBar
          }}
        />
      </Grid>

  )
}

export default UoMConversions